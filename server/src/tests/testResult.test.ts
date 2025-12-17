jest.mock("mongoose", () => {
  const actual = jest.requireActual("mongoose");
  return {
    ...actual, // keep Schema, model, Types, etc.
    connect: jest.fn(), // mock connect
    disconnect: jest.fn(), // mock disconnect
  };
});

import App from "@/app.js";
import request from "supertest";
import TestResultRoute from "@routes/testResult.route.js";

describe("TestResultRoute Integration", () => {
  let app: App;
  let route: TestResultRoute;

  beforeAll(() => {
    route = new TestResultRoute();
    app = new App([route]);
  });

  afterAll(async () => {
    await app.closeDatabaseConnection();
  });

  it("GET /api/test-results/:userId", async () => {
    const res = await request(app.getServer()).get("/api/test-results/abc");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: { dashboard: true }, message: "findAll" });
  });

  it("GET /api/test-results/daily-time/:email", async () => {
    const res = await request(app.getServer()).get(
      "/api/test-results/daily-time/test@email.com",
    );
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: {
        symbolWpm: 30,
      },
      message: "findOne",
    });
  });

  it("POST /api/test-results", async () => {
    const res = await request(app.getServer()).post("/api/test-results").send({
      userId: "abc",
      wpm: 50,
      time: 100,
      score: 500,
      accuracy: 100,
      testType: "english",
      lowercaseWpm: 30,
      symbolWpm: 30,
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      data: {
        userId: "abc",
        wpm: 50,
        time: 100,
        score: 500,
        accuracy: 100,
        testType: "english",
        lowercaseWpm: 30,
        symbolWpm: 30,
      },
    });
  });
});
