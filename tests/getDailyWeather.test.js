const request = require("supertest");
const { baseURL } = require("./constants");

const URL = baseURL;

describe("GET /getDailyWeather", () => {
  const requestBody = { city: "Karachi" };

  it("should return 200", async () => {
    const response = await request(baseURL)
      .post("/api/getDailyWeather")
      .send(requestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });

  it("should return Daily weather data", async () => {
    const response = await request(baseURL)
      .post("/api/getDailyWeather")
      .send(requestBody);
    expect(response.body.data.length > 0).toBe(true);
  });

  const incorrectRequestBody = { city: "Karach" };
  it("should throw an error if the city name is incorrect.", async () => {
    const response = await request(baseURL)
      .post("/api/getDailyWeather")
      .send(incorrectRequestBody);
    expect(response.body.error).not.toBe(null);
  });
});
