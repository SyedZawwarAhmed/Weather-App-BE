const { BASE_URL } = require("../../common/index");
const axios = require("axios");
jest.mock("axios");

describe("GET /api/getCities", () => {
  it("should return data of length 3", async () => {
    const requestBody = { city: "Karachi" };
    axios.post.mockResolvedValue({
      statusCode: 200,
      body: {
        data: [
          {
            name: "El Tarter",
          },
          {
            name: "Sant Julià de Lòria",
          },
          {
            name: "Pas de la Casa",
          },
        ],
        error: null,
      },
    });

    const response = await axios.post(
      `${BASE_URL}/api/getDailyWeather`,
      requestBody
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
    expect(response.body.data.length).toBe(3);
  });
});