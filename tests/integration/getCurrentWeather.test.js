const dotenv = require("dotenv");
dotenv.config();

const { BASE_URL } = require("../../common");
const request = require("supertest");

describe("GET /getCurrentWeather", () => {
  const requestBody = { city: "Karachi" };
  it("should return 200", async () => {
    const response = await request(BASE_URL)
      .post("/api/getCurrentWeather")
      .send(requestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });

  it("should return Current weather data", async () => {
    const response = await request(BASE_URL)
      .post("/api/getCurrentWeather")
      .send(requestBody);
    expect(Object.keys(response.body.data).length).toBe(8);
  });

  const incorrectRequestBody = { city: "Karach" };
  it("should throw an error if the city name is incorrect.", async () => {
    const response = await request(BASE_URL)
      .post("/api/getCurrentWeather")
      .send(incorrectRequestBody);
    expect(response.body.error).not.toBe(null);
  });
});
