'use strict';

// Development specific configuration
// ==================================
module.exports = {

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
