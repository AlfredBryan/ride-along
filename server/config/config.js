module.exports = {
  development: {
    username: "ChimerezeAlfred",
    password: null,
    database: "ride-along",
    host: "127.0.0.1",
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
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "postgres",
    use_env_variable: "DATABASE_URL"
  }
};
