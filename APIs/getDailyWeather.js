const express = require("express");
const router = express.Router();
const axios = require("axios");

const { getDailyWeatherResponse } = require("../DTOs/index");
const { weekday } = require("../common/index");
const getHourDivisibleByThree = require("../common/functions");
const { WeatherExternalAPI } = require("../external_APIs/WeatherExternalAPI");

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;

    const currentHour = getHourDivisibleByThree(new Date());

    const weatherExternalAPI = new WeatherExternalAPI();
    const dailyWeatherData = await weatherExternalAPI.getDailyWeather(city);

    const currentHourForecast = dailyWeatherData.data.list.filter((day) => {
      const currentHourResponse = parseInt(
        day.dt_txt.split(" ")[1].split(":")[0]
      );
      return currentHourResponse === currentHour;
    });
    const data = currentHourForecast.map((day) => {
      const temperature = day.main.temp;
      const weather = day.weather[0].main;
      const weatherIcon = day.weather[0].icon;
      const date = day.dt_txt.split(" ")[0];
      const currentDay = weekday[new Date(day.dt_txt.split(" ")[0]).getDay()];
      const time = day.dt_txt.split(" ")[1];
      return new getDailyWeatherResponse(
        temperature,
        weather,
        weatherIcon,
        date,
        currentDay,
        time
      );
    });
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
