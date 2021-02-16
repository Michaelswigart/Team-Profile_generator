const { expect } = require("@jest/globals");
const Employee = require("../lib/Employee");

// can instantiate Employee instance
test("can instantiate Employee instance", () => {
    const e = new Employee();
    expect(typeof(e)).toBe("objest");
});