const express = require("express");
const app = express();
const port = 5000;
const doetenv = require("dotenv");
doetenv.config();

const { getDailyWeather, getCities, getCurrentWeather } = require("./APIs");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var cors = require('cors')

app.use(cors())

app.use(express.json());
app.use("/api", getDailyWeather);
app.use("/api", getCities)
app.use("/api", getCurrentWeather);

app.use((err, req, res, next) => {
  console.error(err);

  // Handle other errors
  res.status(err.response.data.cod).json({ error: err.response.data.message });
});