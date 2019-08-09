const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = require("./routes/user");
const rideRouter = require("./routes/vehicle")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());

//Add routes
app.use("/api/v1", userRouter);
app.use("/api/v1", rideRouter);

// app.get("*", (req, res) => {
//   res.status(200).send({
//     message: "Welcome to Base route"
//   });
// });

// app.get(
//   "/api/getuser",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

app.get("/api/validate", (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token.startsWith("Bearer")) {
    // Remove bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          authorized: false,
          message: "Token is Invalid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(200).send({
      authorized: true,
      message: "Auth token is available"
    });
  }
});

module.exports = app;
