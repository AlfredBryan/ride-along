const trips = (sequelize, DataTypes) => {
  const Trips = sequelize.define("Trips", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: [false, "origin field cannot be empty"],
      validate: {
        notEmpty: true
      }
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: [false, "destination field cannot be empty"],
      validate: {
        notEmpty: true
      }
    },
    fare: {
      type: DataTypes.STRING,
      allowNull: [false, "fare field cannot be empty"],
      validate: {
        notEmpty: true
      }
    }
  });

  Trips.beforeCreate(trip => {
    trip.origin = trip.origin.toLowerCase();
    trip.destination = trip.destination.toLowerCase();
  });
};

module.exports = trips;
