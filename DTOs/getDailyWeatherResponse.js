class getDailyWeatherResponse {
  temperature;
  weather;
  weatherIcon;
  date;
  day;
  time;
  constructor(temperature, weather, weatherIcon, date, day, time) {
    this.temperature = temperature;
    this.weather = weather;
    this.weatherIcon = weatherIcon;
    this.date = date;
    this.day = day;
    this.time = time;
  }
}

module.exports = getDailyWeatherResponse;
