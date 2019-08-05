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
      isUnique: [true, "email already exists"],
      allowNull: [false, "email field cannot be empty"],
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: [false, "password field cannot be empty"],
      validate: {
        notEmpty: true
      }
    }
  });

  User.beforeCreate(user => {
    user.surname = user.surname.toLowerCase();
    user.first_name = user.firs_name.toLowerCase();
    user.email = user.email.toLowerCase();
  });
};

module.exports = user;
