const { test, expect } = require("@jest/globals");
const Intern = require("../lib/Intern");

test("can set school via constructor", () => {
    const testValue = "UCLA";
    const e = new Intern("foo", 1, "test@test.com", testValue);
    expect(e.school).toBe(testValue);
});