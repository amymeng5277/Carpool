'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Ptrip', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    tripId: DataTypes.INTEGER(11),
    passengerId: DataTypes.INTEGER(11)
  });
}
