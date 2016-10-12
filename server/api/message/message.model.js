'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Message', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER(11)
  });
}
