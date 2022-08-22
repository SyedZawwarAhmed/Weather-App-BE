const dotenv = require("dotenv");
dotenv.config();

const { BASE_URL } = require("../../common/index");
const request = require("supertest");

describe("GET /getCities", () => {
  it("should return 200", async () => {
    const response = await request(BASE_URL).get("/api/getCities");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });

  it("should return array of city objects", async () => {
    const response = await request(BASE_URL).get("/api/getCities");
    expect(response.body.data.length > 0).toBe(true);
  });
});
