const axios = require("axios");
const { APPID, FORECAST_URL } = require("../common/constants");

class WeatherExternalAPI {
  FORECAST_URL;
  APPID;
  constructor() {
    this.FORECAST_URL = FORECAST_URL;
    this.APPID = APPID;
  }
  async getDailyWeather(city) {
    const options = {
      method: "GET",
      url: this.FORECAST_URL,
      params: { q: city, APPID: this.APPID, units: "metric" },
    };
    const dailyWeatherData = await axios.request(options);
    return dailyWeatherData;
  }
}

module.exports = { WeatherExternalAPI };
