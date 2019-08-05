const vehicle = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define("Vehicle", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    plate_number: {
      type: DataTypes.STRING,
      allowNull: [false, "plate_number field cannot be empty"],
      validate: {
        isEmpty: false
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: [false, "model field cannot be empty"],
      validate: {
        isEmpty: false
      }
    },
    year: {
      type: DataTypes.STRING,
      allowNull: [false, "year field cannot be empty"],
      validate: {
        isEmpty: false
      }
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: [false, "capacity field cannot be empty"],
      validate: {
        isEmpty: false
      }
    }
  });

  Vehicle.beforeCreate(vehicle => {
    vehicle.model = vehicle.model.toLowerCase();
  });
};

module.exports = vehicle;
