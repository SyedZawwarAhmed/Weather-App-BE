const axios = require("axios");

class WeatherExternalAPI {
  static async getDailyWeather(FORECAST_URL, city, APPID) {
    const options = {
      method: "GET",
      url: FORECAST_URL,
      params: { q: city, APPID: APPID, units: "metric" },
    };
    const dailyWeatherData = await axios.request(options);
    return dailyWeatherData;
  }
}

module.exports = { WeatherExternalAPI };
