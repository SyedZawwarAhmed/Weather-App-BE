const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();


router.post("/getCurrentWeather", async (req, res) => {
  try {
    const { city } = req.body;
    const currentWeather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}`
    );
    const currentWeatherData = currentWeather.data;
    console.log("🚀 ~ file: currentWeatherRoute.js ~ line 12 ~ router.post ~ currentWeatherData", currentWeatherData)
    res.send({
        "temperature": currentWeatherData.main.temp,
        "weather": currentWeatherData.weather[0].main,
        "weatherIcon": currentWeatherData.weather[0].icon,
        "date": currentWeatherData.dt_txt.split(" ")[0],
        "day": currentWeatherData.weekday[new Date(day.dt_txt.split(" ")[0]).getDay()],
        "time": currentWeatherData.dt_txt.split(" ")[1]
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
