const booking = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    tripId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isEmpty: false
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isEmpty: false
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isEmpty: false
      }
    }
  });
  Booking.beforeCreate(booking => {
    booking.surname = booking.surname.toLowerCase();
    booking.first_name = booking.first_name.toLowerCase();

    return booking;
  });

  Booking.associate = models => {
    Booking.belongsTo(models.User, {
      foreignKey: "userId",
      sourceKey: models.User.id
    });
    Booking.belongsTo(models.Trip, {
      foreignKey: "tripId",
      sourceKey: models.Trip.id
    });
  };

  return Booking;
};

module.exports = booking;
