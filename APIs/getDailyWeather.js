import { threeHours, APPID } from "../common/constants";
import { weekday } from "../common/enums";
import { getDailyWeatherResponse } from "../DTOs/getDailyWeatherResponse";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;
    const date = new Date();
    const hours = date.getHours();
    let minDifference = 3;
    let currentHour = 0;
    for (const threeHour of threeHours) {
      const difference = Math.abs(threeHour - hours);
      if (difference < minDifference) {
        minDifference = difference;
        currentHour = threeHour;
      }
    }

    const dailyWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APPID}&units=metric`
    );

    const currentHourForecast = dailyWeatherData.data.list.filter(
      (day) => parseInt(day.dt_txt.split(" ")[1].split(":")[0]) === currentHour
    );
    res.send(
      currentHourForecast.map((day) => {
        const temperature = day.main.temp
        const weather = day.weather[0].main
        const weatherIcon = day.weather[0].icon
        const date = day.dt_txt.split(" ")[0]
        const currentDay = weekday[new Date(day.dt_txt.split(" ")[0]).getDay()]
        const time = day.dt_txt.split(" ")[1]
        return new getDailyWeatherResponse(temperature, weather, weatherIcon, date, currentDay, time)
      })
    );
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
