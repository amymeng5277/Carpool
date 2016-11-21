'use strict';

var db = require('./sqldb');
var gmail = require('./lib//gmail');
import config from './config/environment';

var conn = new gmail(
        config.gmailAuth.username,
        config.gmailAuth.clientId,
        config.gmailAuth.clientSecret,
        config.gmailAuth.refreshToken);

var _exports = {};

function notify(msgId, type) {
  db.Message.find({
    where: {
      _id: msgId
    },
    include: [{
      model: db.User,
      as: "user"
    }]
  }).then(function (msg) {
    if( type == "email" || type == "both" ){
      conn.sendMail({
        to: msg.user.email,
        subject: msg.subject,
        html: msg.content
      });
      //console.log("Send email to " + msg.user.email);
      //console.log(msg.subject);
      //console.log(msg.content);
    }
  });
  if( type == "email" || type == "both") {
  }
}

_exports.notifyUserTrip = function (userId, tripId){
  db.Trip.find({
    where: {
      _id: tripId,
    }
  }).then(function (trip) {
    var sub = "Upcoming trips!";
    var msg = "You have a trip from " + trip.f_city + " to " + trip.t_city + " at " + trip.f_datetime + ". Don't forget!";
    return db.Message.create({
      userId: userId,
      subject: sub,
      content: msg
    });
  }).then(function (msg) {
    notify(msg._id, "both");
  });
}

_exports.notifyUserQuery = function (queryId){
  db.Query.find({
    where: {
      _id: queryId
    },
    include: [{
      model: db.User,
      as: 'user'
    }]
  }).then(function (query) {
    if(query.user){
      var sub = "Carpool finds trips for your !";
      var msg = "Trip matched!";
      return db.Message.create({
        userId: query.user._id,
        subject: sub,
        content: msg
      });
    }
  }).then(function (msg) {
    if(msg){
      notify(msg._id, "both");
    }
  });
}

_exports.notifyDriverJoin = function (tripId, userId){
  db.Trip.find({
    where: {
      _id: tripId
    },
    include: [{
      model: db.Passenger,
      as: "passengers",
      include: [{
        model: db.User,
        as: "user"
      }]
    },{
      model: db.Driver,
      as: "driver"
    }]
  }).then(function (trip) {
    for(var i = 0; i < trip.passengers.length; i++){
      if(trip.passengers[i].userId == userId){
        var sub = "Your trip has been joined !";
        var msg = trip.passengers[i].user.name + " has just joined your trip from " + trip.f_city + " to " + trip.t_city + " leaving at " + trip.f_datetime;
        return db.Message.create({
          userId: trip.driver.userId,
          subject: sub,
          content: msg
        });
      }
    }
  }).then(function (msg) {
    if(msg){
      notify(msg._id, "both");
    }
  });
}

module.exports = _exports;
