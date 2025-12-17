jest.mock("@services/letterSpeed.service.js", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      getLetterAverages: jest.fn((_) => ({ lowercase: [], symbols: [] })),
      upsertLetterSpeeds: jest.fn((_, _) => ({ updated: true })),
    })),
  };
});
import "reflect-metadata";
import App from "@/app.js";
import request from "supertest";
import LetterSpeedRoute from "@routes/letterSpeed.route.js";

describe("LetterSpeedRoute", () => {
  let app: App;
  let route: LetterSpeedRoute;

  beforeAll(() => {
    route = new LetterSpeedRoute();
    app = new App([route]);
  });

  afterAll(async () => {
    await app.closeDatabaseConnection();
  });

  it("GET /api/letter-speed/:userId", async () => {
    const res = await request(app).get("/api/letter-speed/abc");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: { lowercase: [], symbols: [] },
      message: "findAll",
    });
  });

  it("PUT /api/letter-speed", async () => {
    const res = await request(app)
      .put("/api/letter-speed")
      .send({ userId: "abc", summaries: [{ letter: "a", avgTimeMs: 100 }] });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ data: { updated: true }, message: "created" });
  });
});
