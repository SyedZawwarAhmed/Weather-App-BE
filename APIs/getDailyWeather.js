const express = require("express");
const router = express.Router();
const axios = require("axios");

const getDailyWeatherResponse = require("../DTOs/getDailyWeatherResponse");
const {APPID} = require("../common/constants");
const {FORECAST_URL} = require("../common/constants");
const {threeHours} = require("../common/constants");
const weekday = require("../common/enums");

router.post("/getDailyWeather", async (req, res) => {
  console.log("hello");
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

    const options = {
      method: "GET",
      url: FORECAST_URL,
      params: { q: city, APPID: APPID, units: "metric" },
    };
    const dailyWeatherData = await axios.request(options);

    const currentHourForecast = dailyWeatherData.data.list.filter(
      (day) => parseInt(day.dt_txt.split(" ")[1].split(":")[0]) === currentHour
    );
    res.send(
      currentHourForecast.map((day) => {
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
      })
    );
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
