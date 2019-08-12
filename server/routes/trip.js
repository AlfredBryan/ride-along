const express = require("express");
const Validator = require("validator");

const models = require("../models/index");

const router = express.Router();

// User can view all available trips
router.get("/trips", (req, res) => {
  models.Trip.findAll({
    include: [
      {
        model: models.User
      }
    ]
  })
    .then(trip => {
      if (!trip) {
        res.status(404).send({ message: "no trips found" });
      }

      res.status(200).send({
        success: true,
        data: trip
      });
    })
    .catch(error => {
      res.status(500).send("Error" + error);
    });
});

// User can add a trip
router.post("/trip/add", (req, res) => {
  const errors = [];
  const { origin, destination, fare, departure_time, userId } = req.body;

  if (Validator.isEmpty(origin)) {
    errors.push({ message: "origin field is required" });
  }

  if (Validator.isEmpty(destination)) {
    errors.push({ message: "destination field is required" });
  }

  if (Validator.isEmpty(fare)) {
    errors.push({ message: "fare field is required" });
  }

  if (Validator.isEmpty(departure_time)) {
    errors.push({ message: "departure time field is required" });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    models.Trip.create({
      origin,
      destination,
      fare,
      departure_time,
      userId
    })
      .then(trip => {
        if (!trip) {
          res.status(400).send({ message: "error creating trip" });
        }

        res.status(200).send({
          success: true,
          data: trip
        });
      })
      .catch(error => {
        res.status(500).send("Error" + error);
      });
  }
});

// user can remove trip
router.delete("/trip/remove/:id", (req, res) => {
  models.Trip.destroy({ where: { id: req.params.id } })
    .then(trip => {
      if (!trip) {
        res.status(400).send({ message: "error removing trip" });
      }

      res.status(200).send({ success: true });
    })
    .catch(error => {
      res.status(500).Send("Error" + error);
    });
});

module.exports = router;
