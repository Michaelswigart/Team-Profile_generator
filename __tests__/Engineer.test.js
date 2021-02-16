const Engineer = require("../lib/Engineer");
const Employee = require("../lib/Employee");
const { test, expect } = require("@jest/globals");

test("can set GitHub account via constructor",()=> {
    const testValue = "GitHubUser";
    const e = new Engineer("foo", 1, "test@test.com", testValue);
    expect(e.github).toBe(testValue);
});