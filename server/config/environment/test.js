'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/uwece651f16new-test'
  },
  sequelize: {
    uri: process.env.MYSQL_TEST_URL,
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
};
