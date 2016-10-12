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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    driverId: DataTypes.INTEGER(11)
  });
}
