// test/app.test.js
import request from "supertest";
import app from "../app";
describe("GET /hello", () => {
  it("responds with hello world", async () => {
    const response = await request(app).get("/hello");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  });
});
