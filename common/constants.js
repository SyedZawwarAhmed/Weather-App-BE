<<<<<<< HEAD
const dotenv = require('dotenv');
dotenv.config()

export const APPID = process.env.APPID
=======
const APPID = process.env.APPID;
const FORECAST_URL = process.env.FORECAST_URL;
const BASE_URL = process.env.BASE_URL;

module.exports = { APPID, FORECAST_URL, BASE_URL };
>>>>>>> main
