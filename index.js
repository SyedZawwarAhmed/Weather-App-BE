const express = require("express");
const app = express();
const port = 5000;
const doetenv = require("dotenv");
doetenv.config();

const { getDailyWeather, getCities, getCurrentWeather } = require("./APIs");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use("/api", getDailyWeather);
app.use("/api", getCities)
app.use("/api", getCurrentWeather);
