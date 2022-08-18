const {getHourDivisibleByThree} = require("../common")

describe("getHourDivisibleByThree", () => {
    it ("should return 3", () => {
        const hour = getHourDivisibleByThree(2)
        expect(hour).toBe(3)
    })

    it ("should return 6", () => {
        const hour = getHourDivisibleByThree(7)
        expect(hour).toBe(6)
    })

    it ("should return 0", () => {
        const hour = getHourDivisibleByThree(0)
        expect(hour).toBe(0)
    })

    it ("should return 0", () => {
        const hour = getHourDivisibleByThree(23)
        expect(hour).toBe(0)
    })
})