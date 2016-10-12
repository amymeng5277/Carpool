'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Passenger', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER(11)
  }, {
    timestamps: true,
  });
}
