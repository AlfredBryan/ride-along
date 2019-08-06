const trip = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    fare: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    departure_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Trip.beforeCreate(trip => {
    trip.origin = trip.origin.toLowerCase();
    trip.destination = trip.destination.toLowerCase();

    return trip;
  });

  Trip.associate = models => {
    Trip.belongsToMany(models.User, {
      through: {
        unique: false,
        model: models.Booking
      },
      foreignKey: "tripId"
    });
  };

  sequelize.sync({ force: true }).then(() => {
    console.log("Database & Table");
  });

  return Trip;
};

export default trip;
