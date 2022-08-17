const express = require("express");
const router = express.Router();
const axios = require("axios");

const { WeatherExternalAPI } = require("../external_APIs/WeatherExternalAPI");

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;

    

    const weatherExternalAPI = new WeatherExternalAPI();
    const data = await weatherExternalAPI.getDailyWeather(city);


    res.status(200).json({
      data,
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
