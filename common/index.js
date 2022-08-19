const { APPID, FORECAST_URL, BASE_URL } = require("./constants");
const weekday = require("./enums");
const getHourDivisibleByThree = require("./functions")

module.exports = { APPID, FORECAST_URL, weekday, BASE_URL, getHourDivisibleByThree };