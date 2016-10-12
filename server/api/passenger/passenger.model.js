'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Passenger', {
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
        this.belongsToMany(models.Trip, {
          through: 'Ptrip',
          as: 'trips',
          timestamps: true
        });
      }
    },
  });
}
