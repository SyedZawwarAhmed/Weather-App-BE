const { APPID, FORECAST_URL } = require("./constants");
const weekday = require("./enums");
const getHourDivisibleByThree = require("./functions")

module.exports = { APPID, FORECAST_URL, weekday, getHourDivisibleByThree };