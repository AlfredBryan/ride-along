const user = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      set: function(value) {
        if (value === "true") value = true;
        if (value === "false") value = false;
        this.setDataValue("hidden", value);
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = models => {
    User.belongsToMany(models.Trip, {
      through: {
        unique: false,
        model: models.Booking
      },
      foreignKey: "userId"
    });
    User.hasMany(models.Vehicle, {
      foreignKey: "userId"
    });
  };


  return User;
};

module.exports = user;
