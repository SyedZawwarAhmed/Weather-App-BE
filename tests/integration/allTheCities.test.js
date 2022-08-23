const cities = require("all-the-cities");
jest.mock("all-the-cities", () => [
  {
    name: "El Tarter",
  },
  {
    name: "Sant Julià de Lòria",
  },
  {
    name: "Pas de la Casa",
  },
]);

describe("all-the-cities", () => {
  it("should return a list of cities", async () => {
    expect(cities.length).toBe(3);
  });
});