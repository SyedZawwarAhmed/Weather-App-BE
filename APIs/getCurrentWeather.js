import { APPID } from "../common/constants";
import { getCurrentWeatherResponse } from "../DTOs/getCurrentWeatherResponse";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/getCurrentWeather", async (req, res) => {
  try {
    const { city } = req.body;
    const currentWeather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}`
    );
    const currentWeatherData = currentWeather.data;
    const temperature = currentWeatherData.main.temp;
    const weather = currentWeatherData.weather[0].main;
    const weatherIcon = currentWeatherData.weather[0].icon;
    const date = currentWeatherData.dt_txt.split(" ")[0];
    const day =
      currentWeatherData.weekday[new Date(day.dt_txt.split(" ")[0]).getDay()];
    const time = currentWeatherData.dt_txt.split(" ")[1];
    const response = new getCurrentWeatherResponse(
      temperature,
      weather,
      weatherIcon,
      date,
      day,
      time
    );
    res.send({
      response,
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
