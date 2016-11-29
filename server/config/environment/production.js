'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  // Sequelize connecton opions
  sequelize: {
    uri: process.env.MYSQL_DEV_URL,
    options: {
      logging: console.log,
      dialectOptions: {
        charset: 'utf8mb4'
      },
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true
};
