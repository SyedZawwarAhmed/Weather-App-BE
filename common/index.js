const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express()
const port = 5000;

const getDailyWeather = require('../APIs/getDailyWeather');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(express.json())
app.use("/api", getDailyWeather)