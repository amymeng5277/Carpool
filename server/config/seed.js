/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import {Thing, User, Message, Passenger, Driver, Query, Trip, Vehicle, Ptrip} from '../sqldb';
var logger = require('tracer').console();
var _ = require('lodash');

User.sync()
  .then(function () {
    return User.destroy({where: {}});
  })
  .then(function () {
    User.bulkCreate([{
      _id: 1,
      provider: 'local',
      name: 'Test Passenger1',
      fname: 'Test',
      lname: 'Passenger1',
      email: 'passenger1@example.com',
      password: 'passenger1',
      passengerId: 1,
    }, {
      _id: 2,
      provider: 'local',
      name: 'Test Passenger2',
      fname: 'Test',
      lname: 'Passenger2',
      email: 'passenger2@example.com',
      password: 'passenger2',
      passengerId: 2,
    }, {
      _id: 10,
      provider: 'local',
      name: 'Test Driver1',
      fname: 'Test',
      lname: 'Driver1',
      email: 'driver1@example.com',
      password: 'driver1',
      driverId: 10,
    }, {
      _id: 11,
      provider: 'local',
      name: 'Test Driver2',
      fname: 'Test',
      lname: 'Driver2',
      email: 'driver2@example.com',
      password: 'driver2',
      driverId: 11,
    }, {
      _id: 1000,
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      fname: 'Admin ',
      lname: 'User',
      email: 'admin@example.com',
      password: 'admin'
    }]).then(function () {
      logger.info('finished populating users');
    });
  });

Message.sync()
  .then(function () {
    return Message.destroy({where: {}});
  })
  .then(function () {
    Message.bulkCreate([{
      _id: 1,
      content: 'This is a message for Test Passenger1',
      userId: 1
    }, {
      _id: 2,
      content: 'This is a message for Test Passenger2',
      userId: 2
    }, {
      _id: 10,
      content: 'This is a message for Test Driver1',
      userId: 10
    }, {
      _id: 11,
      content: 'This is a message for Test Driver2',
      userId: 11
    }, {
      _id: 1000,
      content: 'This is a message for Admin User',
      userId: 1000
    }]).then(function () {
      logger.info('finished populating messages!');
    });
  });

Passenger.sync()
  .then(function () {
    return Passenger.destroy({where: {}});
  })
  .then(function () {
    Passenger.bulkCreate([{
      _id: 1,
      userId: 1
    }, {
      _id: 2,
      userId: 2
    }]).then(function () {
      logger.info('finished populating passengers!');
    });
  });

Driver.sync()
  .then(function () {
    return Driver.destroy({where: {}});
  })
  .then(function () {
    Driver.bulkCreate([{
      _id: 10,
      userId: 10
    }, {
      _id: 11,
      userId: 11
    }]).then(function () {
      logger.info('finished populating drivers!');
    });
  });

Vehicle.sync()
  .then(function () {
    return Vehicle.destroy({where: {}});
  })
  .then(function () {
    Vehicle.bulkCreate([{
      _id: 1,
      maker: 'BMW',
      model: 'X3',
      seat: 5,
      driverId: 10,
      color: 'Blue',
      year: 2015,
      wheelchair: 1,
      babyseat: '0',
      licenseNumber: '33-CCC-DDD',
    }, {
      _id: 2,
      maker: 'Honda',
      model: 'Civic',
      seat: 4,
      driverId: 10,
      color: 'White',
      year: 2016,
      wheelchair: 1,
      babyseat: '2',
      licenseNumber: '33-CCC-KKK',
    },{
      _id: 3,
      maker: 'BMW',
      model: 'X3',
      seat: 5,
      driverId: 11,
      color: 'Blue',
      year: 2015,
      wheelchair: 1,
      babyseat: '0',
      licenseNumber: '33-CCC-DDD',
    }, {
      _id: 4,
      maker: 'Honda',
      model: 'Civic',
      seat: 4,
      driverId: 11,
      color: 'White',
      year: 2016,
      wheelchair: 1,
      babyseat: '2',
      licenseNumber: '33-CCC-KKK',
    }]).then(function () {
      logger.info('finished populating vehicles!');
    });
  });

Query.sync()
  .then(function () {
    return Query.destroy({where: {}});
  })
  .then(function () {
    Query.bulkCreate([{
      _id: 1,
      f_city_id: 1, /* Please indicate what does this mean?*/
      t_city_id: 2, /* Please indicate what does this mean?*/
      seat: 4,
      dep_date_f: new Date(),
      dep_date_t: new Date(),
      passengerId: 1
    }, {
      _id: 2,
      f_city_id: 2, /* Please indicate what does this mean?*/
      t_city_id: 1, /* Please indicate what does this mean?*/
      seat: 4,
      dep_date_f: new Date(),
      dep_date_t: new Date(),
      passengerId: 2
    }]).then(function () {
      logger.info('finished populating queries!');
    })
  });

Trip.sync()
  .then(function () {
    return Trip.destroy({where: {}});
  })
  .then(function () {
    Trip.bulkCreate([{
      _id: 1,
      f_city_id: 1,
      t_city_id: 2,
      f_datetime: new Date(),
      t_datetime: new Date(),
      driverId: 10,
      vehicleId: 1,
      seats_available: 3,
      price: 15.00,
      wheelchair: true,
      babySeat: true,
      open: true,
      completed: false,
      f_city: 'Waterloo',
      f_address: 'Ring Rd, Waterloo, ON N2L 3G1, Canada',
      t_city: 'Toronto',
      t_address: 'University of Toronto, College View Avenue, Toronto, ON M5P 3J1, Canada',
      f_latitude: 43.4727179,
      f_longitude: -80.5443791,
      t_latitude: 43.682394,
      t_longitude: -79.4190418,
    }, {
      _id: 2,
      f_city_id: 2,
      t_city_id: 1,
      f_datetime: new Date(),
      t_datetime: new Date(),
      driverId: 11,
      vehicleId: 2,
      seats_available: 4,
      price: 10.00,
      wheelchair: true,
      babySeat: false,
      open: false,
      completed: true,
      f_city: 'Waterloo',
      f_address: 'Ring Rd, Waterloo, ON N2L 3G1, Canada',
      t_city: 'Toronto',
      t_address: 'University of Toronto, College View Avenue, Toronto, ON M5P 3J1, Canada',
      f_latitude: 43.4727179,
      f_longitude: -80.5443791,
      t_latitude: 43.682394,
      t_longitude: -79.4190418,
    }]).then(function () {
      logger.info('finished populating trips!');
    });
  });

Ptrip.sync()
  .then(function () {
    return Ptrip.destroy({where: {}});
  })
  .then(function () {
    Ptrip.bulkCreate([{
      tripId: 1,
      passengerId: 1
    }, {
      tripId: 1,
      passengerId: 2
    }, {
      tripId: 2,
      passengerId: 1
    }, {
      tripId: 2,
      passengerId: 2
    }]).then(function () {
      logger.info('finished populating ptrips!')
    });
  });

Thing.sync()
  .then(function () {
    return Thing.destroy({where: {}});
  })
  .then(function () {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
      'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
      'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
      'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
      'tests alongside code. Automatic injection of scripts and ' +
      'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
      'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
      'payload, minifies your scripts/css/images, and rewrites asset ' +
      'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
      'and openshift subgenerators'
    }]).then(function () {
      logger.info('finished populating things!');
    });
  });
