const axios = require("axios");
const {
  APPID,
  FORECAST_URL,
  weekday,
  getHourDivisibleByThree,
} = require("../common/index");
const { getDailyWeatherExternalAPIResponse } = require("../DTOs/index");

class WeatherExternalAPI {
  FORECAST_URL;
  APPID;
  currentHour;
  weekday;
  constructor() {
    this.FORECAST_URL = FORECAST_URL;
    this.APPID = APPID;
    this.currentHour = getHourDivisibleByThree(new Date().getHours());
    this.weekday = weekday;
  }
  async getDailyWeather(city) {
    const options = {
      method: "GET",
      url: this.FORECAST_URL,
      params: { q: city, APPID: this.APPID, units: "metric" },
    };
    const dailyWeatherData = await axios.request(options);
    const currentHourForecast = dailyWeatherData.data.list.filter((day) => {
      const currentHourResponse = parseInt(
        day.dt_txt.split(" ")[1].split(":")[0]
      );
      return currentHourResponse === this.currentHour;
    });
    const data = currentHourForecast.map((day) => {
      const temperature = day.main.temp;
      const weather = day.weather[0].main;
      const weatherIcon = day.weather[0].icon;
      const date = day.dt_txt.split(" ")[0];
      const currentDay =
        this.weekday[new Date(day.dt_txt.split(" ")[0]).getDay()];
      const time = day.dt_txt.split(" ")[1];
      return new getDailyWeatherExternalAPIResponse(
        temperature,
        weather,
        weatherIcon,
        date,
        currentDay,
        time
      );
    });
    return data;
  }
}

module.exports = { WeatherExternalAPI };
