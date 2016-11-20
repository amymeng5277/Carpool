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
    trip_des: DataTypes.STRING(255),
    trip_arrive: DataTypes.STRING(255),
    seats_available: DataTypes.INTEGER(11),
    price: DataTypes.DOUBLE,
    wheelchair: DataTypes.BOOLEAN,
    babySeat: DataTypes.BOOLEAN,
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
