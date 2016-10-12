'use strict';


export default function (sequelize, DataTypes) {
  return sequelize.define('Driver', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    timestamps: true,
    classMethods: {
      associate: function (models) {
        this.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
        this.hasMany(models.Trip, {
          foreignKey: 'driverId',
          as: 'trips'
        });
        this.hasMany(models.Vehicle, {
          foreignKey: 'driverId',
          as: 'vehicles'
        });
      }
    }
  });
}
