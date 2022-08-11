const express = require("express");
const router = express.Router();
const cities = require("all-the-cities");

router.get("/getCities", (req, res) => {
  try {
    res.json(cities.map(city => city.name));
  } catch (error) {
    res.send(error.message)
  }
});

module.exports = router;
