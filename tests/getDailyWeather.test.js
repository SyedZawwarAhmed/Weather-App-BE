const request = require("supertest");
const { BASE_URL } = require("../common/index");
const axios = require("axios");
jest.mock("axios");

describe("GET /getDailyWeather", () => {
  const requestBody = { city: "Karachi" };

  it("should return data of length 3" , async () => {
    axios.post.mockResolvedValue({
      data: [
        {
          temperature: 28.5,
          weather: "Clouds",
          weatherIcon: "04n",
          date: "2022-08-17",
          day: "Wednesday",
          time: "15:00:00",
        },
        {
          temperature: 26.77,
          weather: "Rain",
          weatherIcon: "10n",
          date: "2022-08-18",
          day: "Thursday",
          time: "15:00:00",
        },
        {
          temperature: 27.28,
          weather: "Rain",
          weatherIcon: "10n",
          date: "2022-08-19",
          day: "Friday",
          time: "15:00:00",
        },
      ],
    });

    const response = await axios.post(`${BASE_URL}/api/getDailyWeather`, requestBody)
    expect(response.data.length === 3).toBe(true);
  });
});
