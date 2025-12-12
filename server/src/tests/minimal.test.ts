jest.mock("@controllers/userPreference.controller.js", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      getUserPreferencesById: jest.fn((req, res) =>
        res.status(200).json({ data: "mock", message: "findOne" }),
      ),
      createUserPreferences: jest.fn((req, res) =>
        res.status(201).json({ data: "mock", message: "created" }),
      ),
      updateUserPreferences: jest.fn((req, res) =>
        res.status(200).json({ data: "mock", message: "updated" }),
      ),
      deleteUserPreferences: jest.fn((req, res) =>
        res.status(200).json({ data: "mock", message: "deleted" }),
      ),
    })),
  };
});

import express from "express";
import request from "supertest";
import UserPreferencesRoute from "@routes/userPreference.route.js";

describe("UserPreferencesRoute", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    const route = new UserPreferencesRoute();
    app.use("/api/user-preferences", route.router);
  });

  it("GET /api/user-preferences/:id", async () => {
    const res = await request(app).get("/api/user-preferences/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: "mock", message: "findOne" });
  });

  it("POST /api/user-preferences", async () => {
    const res = await request(app)
      .post("/api/user-preferences")
      .send({ email: "test@email.com", userId: "1" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ data: "mock", message: "created" });
  });

  it("PUT /api/user-preferences/:id", async () => {
    const res = await request(app)
      .put("/api/user-preferences/1")
      .send({ email: "test@email.com", userId: "1" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: "mock", message: "updated" });
  });

  it("DELETE /api/user-preferences/:id", async () => {
    const res = await request(app).delete("/api/user-preferences/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: "mock", message: "deleted" });
  });
});
