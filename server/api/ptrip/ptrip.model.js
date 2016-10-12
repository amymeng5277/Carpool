'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Ptrip', {
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
        this.belongsTo(models.Passenger, {
          foreignKey: 'passengerId',
          as: 'passenger',
          constraints: false
        });
        this.belongsTo(models.Trip, {
          foreignKey: 'tripId',
          as: 'trip',
          constraints: false
        });
      }
    },
  });
}
