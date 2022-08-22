const { BASE_URL } = require("../../common/index");
const axios = require("axios");
jest.mock("axios");

describe("GET /getDailyWeather", () => {
  
  it("should return data of length 3", async () => {
    const requestBody = { city: "Karachi" };
    axios.post.mockResolvedValue({
      statusCode: 200,
      body: {
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
        error: null,
      }
    });

    const response = await axios.post(
      `${BASE_URL}/api/getDailyWeather`,
      requestBody
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
    expect(response.body.data.length).toBe(3);
  });

  it("should throw an error if city name is not found", async() => {
    const requestBody = { city: "Karach" };
    const mockResponse =  {
      statusCode: 400,
      body: {
        data: [],
        error: "city not found",
      }
    } 

    axios.post.mockResolvedValue(mockResponse)

    const response = await axios.post(
      `${BASE_URL}/api/getDailyWeather`,
      requestBody
    );

    expect(response.statusCode).toBe(400);
    expect(response.body.error).not.toBe(null);
    expect(response.body.data.length).toBe(0);
  })
});
