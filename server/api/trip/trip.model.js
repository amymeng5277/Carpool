'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Trip', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    f_city_id: DataTypes.INTEGER(11),
    t_city_id: DataTypes.INTEGER(11),
    dep_date_f: DataTypes.DATE,
    dep_date_t: DataTypes.DATE,
  }, {
    timestamps: true,
    classMethods: {
      associate: function (models) {
        this.belongsTo(models.Driver, {
          foreignKey: 'driverId',
          as: 'driver'
        });
        this.belongsToMany(models.Passenger, {
          through: 'Ptrip',
          as: 'passengers',
          timestamps: true
        });

      }
    }
  });
}
