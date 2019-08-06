const user = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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

  User.beforeCreate(user => {
    user.surname = user.surname.toLowerCase();
    user.first_name = user.firs_name.toLowerCase();
    user.email = user.email.toLowerCase();

    return user;
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

  sequelize.sync({ force: true }).then(() => {
    console.log("Database & Table");
  });

  return User;
};

export default user;
