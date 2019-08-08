const vehicle = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define("Vehicle", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    plate_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false
      }
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false
      }
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false
      }
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false
      }
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Vehicle.beforeCreate(vehicle => {
    vehicle.model = vehicle.model.toLowerCase();

    return vehicle;
  });

  Vehicle.associate = models => {
    Vehicle.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return Vehicle;
};

module.exports = vehicle;
