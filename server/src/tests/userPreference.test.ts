jest.mock("mongoose", () => {
  const actual = jest.requireActual("mongoose");
  return {
    ...actual, // keep Schema, model, Types, etc.
    connect: jest.fn(), // mock connect
    disconnect: jest.fn(), // mock disconnect
  };
});

import request from "supertest";
import App from "@/app.js";
import { CreateUserPreferencesDto } from "@dtos/userPreference.dto.js";
import UserPreferencesRoute from "@routes/userPreference.route.js";

let app: App;
let route: UserPreferencesRoute;

beforeAll(() => {
  route = new UserPreferencesRoute();
  app = new App([route]);
});

afterAll(async () => {
  await app.closeDatabaseConnection();
});

describe("Testing UserPreferences", () => {
  describe("[GET] /user-preferences/:id", () => {
    it("response findOne userPreference", async () => {
      const userPreferenceId = "qpwoeiruty";

      const userPreferences =
        route.userPreferencesController.userPreferencesService.userPreferences;

      userPreferences.findOne = jest.fn().mockReturnValue({
        userId: "qpwoeiruty",
        email: "a@email.com",
        mode: "dark",
        zipperEnabled: true,
        spaceChar: " ",
        skipOverTabs: false,
        cursorChar: "|",
        smoothCursor: true,
      });

      return request(app.getServer())
        .get(`/api${route.path}/${userPreferenceId}`)
        .expect(200);
    });
  });

  describe("[POST] /user-preferences", () => {
    it("response Create userPreference", async () => {
      const userPreferenceData: CreateUserPreferencesDto = {
        email: "test@email.com",
        userId: "qpwoeiruty",
        mode: "dark",
        zipperEnabled: true,
        spaceChar: " ",
        skipOverTabs: false,
        cursorChar: "|",
        smoothCursor: true,
      };

      const userPreferences =
        route.userPreferencesController.userPreferencesService.userPreferences;

      userPreferences.findOne = jest.fn().mockReturnValue(null);
      userPreferences.create = jest.fn().mockReturnValue({
        userId: "60706478aad6c9ad19a31c84",
        email: userPreferenceData.email,
      });

      return request(app.getServer())
        .post(`/api${route.path}`)
        .send(userPreferenceData)
        .expect(201);
    });
  });

  describe("[PUT] /user-preferences/:id", () => {
    it("response Update userPreference", async () => {
      const userPreferenceId = "qpwoeiruty";
      const userPreferenceData: CreateUserPreferencesDto = {
        email: "test@email.com",
        userId: "qpwoeiruty",
        mode: "dark",
        zipperEnabled: true,
        spaceChar: " ",
        skipOverTabs: false,
        cursorChar: "|",
        smoothCursor: true,
      };

      const userPreferences =
        route.userPreferencesController.userPreferencesService.userPreferences;

      if (userPreferenceData.email) {
        userPreferences.findOne = jest.fn().mockReturnValue({
          userId: userPreferenceId,
          email: userPreferenceData.email,
        });
      }

      userPreferences.findByIdAndUpdate = jest.fn().mockReturnValue({
        userId: userPreferenceId,
        email: userPreferenceData.email,
      });

      return request(app.getServer())
        .put(`/api${route.path}/${userPreferenceId}`)
        .send(userPreferenceData);
    });
  });

  describe("[DELETE] /user-preferences/:id", () => {
    it("response Delete userPreference", async () => {
      const userPreferenceId = "60706478aad6c9ad19a31c84";

      const userPreferences =
        route.userPreferencesController.userPreferencesService.userPreferences;

      userPreferences.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: "60706478aad6c9ad19a31c84",
        email: "test@email.com",
      });

      return request(app.getServer())
        .delete(`/api${route.path}/${userPreferenceId}`)
        .expect(200);
    });
  });
});
