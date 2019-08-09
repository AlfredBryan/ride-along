const vehicle = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define("Vehicle", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    plate_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Vehicle.associate = models => {
    Vehicle.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  return Vehicle;
};

module.exports = vehicle;
