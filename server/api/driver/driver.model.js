'use strict';


export default function (sequelize, DataTypes) {
  return sequelize.define('Driver', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    userId: DataTypes.INTEGER(11),
  }, {
    classMethods: {
      associate: function (models) {
        this.hasMany(models.Trip, {
          foreignKey: 'driverId',
          as: 'trips'
        });
      }
    }
  });
}
