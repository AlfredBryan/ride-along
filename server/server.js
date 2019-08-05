const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());

app.get("*", (req, res) => {
  res.status(200).send({
    message: "Welcome to Base route"
  });
});

app.get(
  "/api/getuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = app;
