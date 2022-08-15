const express = require("express");
const app = express();
const port = 5000;
const getDailyWeather = require("./getDailyWeather");
const doetenv = require("dotenv");
doetenv.config();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use("/api", getDailyWeather);
