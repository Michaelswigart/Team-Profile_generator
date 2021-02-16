const { test, expect } = require("@jest/globals");
const Manger = require("../lib/Manager");
 test("can set office number via constructor argument", () => {
     const testValue = 100;
     const e = new Manager("foo", 1, "test@test.com", testValue);
     expect(e.officeNumber).toBe(testValue);
 });