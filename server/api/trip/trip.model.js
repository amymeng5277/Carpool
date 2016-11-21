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
    f_city: DataTypes.STRING(255),
    f_address: DataTypes.STRING(255),
    t_city: DataTypes.STRING(255),
    t_address: DataTypes.STRING(255),
    f_latitude: DataTypes.DOUBLE,
    f_longitude: DataTypes.DOUBLE,
    t_latitude: DataTypes.DOUBLE,
    t_longitude: DataTypes.DOUBLE,
    f_datetime: DataTypes.DATE,
    t_datetime: DataTypes.DATE,
    price: DataTypes.DOUBLE,
    seats_available: DataTypes.INTEGER(11),
    wheelchair: DataTypes.BOOLEAN,
    babyseat: DataTypes.BOOLEAN,
    open: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    classMethods: {
      associate: function (models) {
        this.belongsTo(models.Driver, {
          foreignKey: 'driverId',
          as: 'driver',
          constraints: false,
        });

        this.belongsTo(models.Vehicle, {
          foreignKey: 'vehicleId',
          as: 'vehicle',
          constraints: false,
        });

        this.belongsToMany(models.Passenger, {
          through: 'Ptrips',
          as: 'passengers',
          constraints: false,
          timestamps: true
        });

      }
    }
  });
}
