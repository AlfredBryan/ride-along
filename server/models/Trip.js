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
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Trip.associate = models => {
    Trip.belongsToMany(models.User, {
      through: {
        unique: false,
        model: models.Booking
      },
      foreignKey: "tripId"
    });
    Trip.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return Trip;
};

module.exports = trip;
