const express = require('express')
const app = express()
const port = 5000
const citiesRoute = require("./routes/getCities")
const dailyWeatherRoute = require("./routes/getDailyWeather")
const currentWeatherRoute = require("./routes/getCurrentWeather")

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(express.json())
app.use('/api', citiesRoute)
app.use("/api", dailyWeatherRoute)
app.use("/api", currentWeatherRoute)