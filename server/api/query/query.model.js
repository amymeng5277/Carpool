'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Query', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    f_city_id: DataTypes.INTEGER(11),
    t_city_id: DataTypes.INTEGER(11),
    f_address: DataTypes.STRING(255),
    t_city: DataTypes.STRING(255),
    t_address: DataTypes.STRING(255),
    f_latitude: DataTypes.DOUBLE,
    f_longitude: DataTypes.DOUBLE,
    t_latitude: DataTypes.DOUBLE,
    t_longitude: DataTypes.DOUBLE,
    seat: DataTypes.INTEGER(11),
    dep_date_f: DataTypes.DATE,
    dep_date_t: DataTypes.DATE,
    passengerId: DataTypes.INTEGER(11)
  }, {
    timestamps: true,
    classMethods: {
      associate: function (models) {
        this.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
          constraints: false,
        });
      }
    },
  });
}
