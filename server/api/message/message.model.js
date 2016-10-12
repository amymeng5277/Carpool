'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Message', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER(11)
  }, {
    timestamps: true,
  });
}
