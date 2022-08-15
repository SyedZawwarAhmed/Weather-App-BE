const express = require("express");
const router = express.Router();
const axios = require("axios");

const { getDailyWeatherResponse } = require("../DTOs/index");
const { APPID , FORECAST_URL, weekday } = require("../common/index");

const getCurrentHour = () => {
  const date = new Date();
  const hours = date.getHours();
  const remainder = hours % 3;
  const currentHour = remainder === 0 ? hours : remainder === 1 ? hours - 1 : hours + 1;
  return currentHour;
};

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;

    const currentHour = getCurrentHour();

    const options = {
      method: "GET",
      url: FORECAST_URL,
      params: { q: city, APPID: APPID, units: "metric" },
    };
    const dailyWeatherData = await axios.request(options);

    const currentHourForecast = dailyWeatherData.data.list.filter((day) => {
      const currentHourResponse = parseInt(
        day.dt_txt.split(" ")[1].split(":")[0]
      );
      return currentHourResponse === currentHour;
    });
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
