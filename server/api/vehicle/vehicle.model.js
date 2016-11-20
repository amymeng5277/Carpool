'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Vehicle', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    maker: DataTypes.STRING(50),
    model: DataTypes.STRING(100),
    seat: DataTypes.INTEGER(11),
    color: DataTypes.STRING(50),
    year: DataTypes.INTEGER(11),
    wheelchair: DataTypes.INTEGER(11),
    babySeat: DataTypes.STRING(50),
    licenseNumber: DataTypes.STRING(50),
  }, {
    timestamps: true,
    classMethods: {
      associate: function (models) {
        this.belongsTo(models.Driver, {
          foreignKey: 'driverId',
          as: 'driver',
          constraints: false,
        });

        this.hasMany(models.Trip, {
          foreignKey: 'vehicleId',
          as: 'trips',
          constraints: false,
        });
      }
    }
  });
}
