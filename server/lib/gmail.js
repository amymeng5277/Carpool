'use strict'

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');


function GmailConn(user, clientId, clientSecret, refreshToken) {
    if (!(this instanceof GmailConn))
    return new GmailConn(user, clientId, clientSecret, refreshToken);

    this.user = user;
    this.generator = require('xoauth2').createXOAuth2Generator({
        user: this.user + '@gmail.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    });

    this.transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    xoauth2: this.generator
                },
            });

}

GmailConn.prototype.sendMail = function(data){
    data.from = this.user + '@gmail.com';
    this.transporter.sendMail(data, function(error, info){
        if(error){
            return console.log(error);
        };
        console.log('Message sent: ' + info.response);
    });
};

module.exports = GmailConn;
