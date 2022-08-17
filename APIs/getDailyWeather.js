const express = require("express");
const router = express.Router();
const axios = require("axios");

const { WeatherExternalAPI } = require("../external_APIs/WeatherExternalAPI");
const { getDailyWeatherResponse } = require("../DTOs");

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;

    const weatherExternalAPI = new WeatherExternalAPI();
    const data = await weatherExternalAPI.getDailyWeather(city);
    const dailyWeatherData = new getDailyWeatherResponse(data);

    res.status(200).json({
      data: dailyWeatherData,
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
