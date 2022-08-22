const express = require("express");
const router = express.Router();
const cities = require("all-the-cities");
const { getCitiesResponse } = require("../DTOs");

router.get("/getCities", (req, res) => {
  try {
    res.json(cities.map((city) => new getCitiesResponse(city.name)));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
