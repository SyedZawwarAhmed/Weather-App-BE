const { getCurrentWeatherResponse } = require("../DTOs");
const { WeatherExternalAPI } = require("../external_APIs");

const express = require("express");
const router = express.Router();

router.post("/getCurrentWeather", async (req, res, next) => {
  try {
    const { city } = req.body;
    const weatherExternalAPI = new WeatherExternalAPI();
    const data = await weatherExternalAPI.getCurrentWeather(city);

    const response = new getCurrentWeatherResponse(
      data.temperature,
      data.weather,
      data.weatherIcon,
      data.date,
      data.day,
      data.time,
      data.feelsLike,
      data.humidity
    );
    res.status(200).json({
      data: response,
      error: null,
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
