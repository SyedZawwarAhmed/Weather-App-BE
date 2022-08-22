const express = require("express");
const router = express.Router();
const cities = require("all-the-cities");
const { getCitiesResponse } = require("../DTOs");
const { response } = require("express");

router.get("/getCities", (req, res) => {
  try {
    const citiesData = cities.map((city) => new getCitiesResponse(city.name));
    res.json({
      data: citiesData,
      error: null,
    });
  } catch (error) {
    res.json({
      data: null,
      error: error.message,
    });
  }
});

module.exports = router;
