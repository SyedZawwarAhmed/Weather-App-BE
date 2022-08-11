const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/getDailyWeather", async (req, res) => {
  try {
    const { city } = req.body;
    const date = new Date()
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const hours = date.getHours();
    const threeHours = [0, 3, 6, 9, 12, 15, 18, 21]
    let minDifference = 3
    let currentHour = 0
    for (const threeHour of threeHours) {
        const difference = Math.abs(threeHour - hours)
        if (difference < minDifference) {
            minDifference = difference
            currentHour = threeHour;
        }
    }

    const dailyWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=39cd5eb32b4a2c8bb9d707f7f0846c6a&units=metric`
    );

    const currentHourForecast = dailyWeatherData.data.list.filter(day => parseInt(day.dt_txt.split(" ")[1].split(":")[0]) === currentHour)
    res.send(currentHourForecast.map(day => ({
        "temperature": day.main.temp,
        "weather": day.weather[0].main,
        "weatherIcon": day.weather[0].icon,
        "date": day.dt_txt.split(" ")[0],
        "day": weekday[new Date(day.dt_txt.split(" ")[0]).getDay()],
        "time": day.dt_txt.split(" ")[1]
    })));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
