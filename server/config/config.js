require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_DB_HOSTNAME,
    dialect: "postgres"
  },
  test: {
    username: "ChimerezeAlfred",
    password: null,
    database: "ride-along",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};
