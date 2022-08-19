const express = require("express");
const router = express.Router();

const { WeatherExternalAPI } = require("../external_APIs");
const { getDailyWeatherResponse } = require("../DTOs");
const { getHourDivisibleByThree } = require("../common");

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;
    const currentHour = getHourDivisibleByThree(new Date().getHours());
    const weatherExternalAPI = new WeatherExternalAPI();
    const data = await weatherExternalAPI.getDailyWeather(city, currentHour);
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
    res.json({
      data: null,
      error: error.message,
    });
  }
});

module.exports = router;
