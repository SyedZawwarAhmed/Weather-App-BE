class getCurrentWeatherResponse {
  temperature;
  weather;
  weatherIcon;
  date;
  day;
  time;
  feelsLike;
  humidity;
  constructor(
    temperature,
    weather,
    weatherIcon,
    date,
    day,
    time,
    feelsLike,
    humidity
  ) {
    this.temperature = temperature;
    this.weather = weather;
    this.weatherIcon = weatherIcon;
    this.date = date;
    this.day = day;
    this.time = time;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
  }
}

module.exports = getCurrentWeatherResponse ;
