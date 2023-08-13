const express = require("express");
const router = express.Router();

const { WeatherExternalAPI } = require("../external_APIs");
const { getDailyWeatherResponse } = require("../DTOs");

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;
    const weatherExternalAPI = new WeatherExternalAPI();
    const data = await weatherExternalAPI.getDailyWeather(city);
    const dailyWeatherData = data.map(
      (day) =>
        new getDailyWeatherResponse(
          day.temperature,
          day.weather,
          day.weatherIcon,
          day.date,
          day.day,
          day.time
        )
    );

    res.status(200).json({
      data: dailyWeatherData,
      error: null,
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
