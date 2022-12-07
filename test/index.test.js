// 用 mocha 测试 express api
require("dotenv").config({ override: true });
const e = require("express");
const request = require("supertest");
const app = require("../app");

// GET /
describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/").expect(200, done);
  }).timeout(10000);
});

// GET /api/get-conversation
describe("GET /api/get-conversation", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/get-conversation");
    expect(response.statusCode).toBe(200);
  }).timeout(10000);
});
