const express = require("express");
const Validator = require("validator");

const models = require("../models/index");

const router = express.Router();

//User can view all available rides with their owner
router.get("/vehicles", (req, res) => {
  models.Vehicle.findAll({
    include: [
      {
        model: models.User
      }
    ]
  })
    .then(rides => {
      if (!rides) {
        return res.status(404).send({ message: "No rides found" });
      }
      res.status(200).send({ success: true, rides: rides });
    })
    .catch(error => {
      res.status(500).send("Error" + error);
    });
});

//User can add rides
router.post("/vehicles/add", (req, res) => {
  const errors = [];
  const {
    plate_number,
    manufacturer,
    model,
    year,
    capacity,
    userId
  } = req.body;

  //Check Input validity
  if (Validator.isEmpty(plate_number)) {
    errors.push({ message: "plate number field is required" });
  }

  if (Validator.isEmpty(manufacturer)) {
    errors.push({ message: "manufacturer field is required" });
  }

  if (Validator.isEmpty(model)) {
    errors.push({ message: "model field is required" });
  }

  if (Validator.isEmpty(year)) {
    errors.push({ message: "year field is required" });
  }

  if (Validator.isEmpty(capacity)) {
    errors.push({ message: "capacity field is required" });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    models.Vehicle.create({
      plate_number,
      manufacturer,
      model,
      year,
      capacity,
      userId
    })
      .then(ride => {
        if (!ride) {
          res.status(400).send({ message: "error creating ride" });
        }

        res.status(200).send({
          success: true,
          ride: ride
        });
      })
      .catch(error => {
        res.status(500).send("Error" + error);
      });
  }
});

// User can view single ride
router.get("/vehicle/:id", (req, res) => {
  models.Vehicle.findOne({ where: { id: req.params.id } })
    .then(ride => {
      if (!ride) {
        res.status(404).send({ message: "ride not found" });
      }

      res.status(200).send({
        success: true,
        ride: ride
      });
    })
    .catch(error => {
      res.status(500).send("Error" + error);
    });
});

//User can update ride
router.put("/vehicle/update/:id", (req, res) => {
  const errors = [];
  const { plate_number, manufacturer, model, year, capacity } = req.body;
  //Check Input validity
  if (Validator.isEmpty(plate_number)) {
    errors.push({ message: "plate number field is required" });
  }

  if (Validator.isEmpty(manufacturer)) {
    errors.push({ message: "manufacturer field is required" });
  }

  if (Validator.isEmpty(model)) {
    errors.push({ message: "model field is required" });
  }

  if (Validator.isEmpty(year)) {
    errors.push({ message: "year field is required" });
  }

  if (Validator.isEmpty(capacity)) {
    errors.push({ message: "capacity field is required" });
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    models.Vehicle.update(
      {
        plate_number,
        model,
        manufacturer,
        capacity,
        year
      },
      { where: { id: req.params.id } }
    )
      .then(ride => {
        if (!ride) {
          res.status(400).send({ message: "oops ride could not be updated" });
        }

        res.status(200).send({
          success: true,
          ride: ride
        });
      })
      .catch(error => {
        res.status(500).send("Error" + error);
      });
  }
});

module.exports = router;
