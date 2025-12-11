import mongoose from "mongoose";
import request from "supertest";
import App from "@/app.js";
import { CreateUserPreferencesDto } from "@dtos/userPreference.dto.js";
import UserPreferencesRoute from "@routes/userPreference.route.js";

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing UserPreferences", () => {
  describe("[GET] /user-preferences/:id", () => {
    it("response findOne userPreference", async () => {
      const userPreferenceId = "qpwoeiruty";

      const userPreferencesRoute = new UserPreferencesRoute();
      const userPreferences =
        userPreferencesRoute.userPreferencesController.userPreferencesService
          .userPreferences;

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

      (mongoose as any).connect = jest.fn();
      const app = new App([userPreferencesRoute]);
      return request(app.getServer())
        .get(`/api${userPreferencesRoute.path}/${userPreferenceId}`)
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

      const userPreferencesRoute = new UserPreferencesRoute();
      const userPreferences =
        userPreferencesRoute.userPreferencesController.userPreferencesService
          .userPreferences;

      userPreferences.findOne = jest.fn().mockReturnValue(null);
      userPreferences.create = jest.fn().mockReturnValue({
        userId: "60706478aad6c9ad19a31c84",
        email: userPreferenceData.email,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([userPreferencesRoute]);
      return request(app.getServer())
        .post(`/api${userPreferencesRoute.path}`)
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

      const userPreferencesRoute = new UserPreferencesRoute();
      const userPreferences =
        userPreferencesRoute.userPreferencesController.userPreferencesService
          .userPreferences;

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

      (mongoose as any).connect = jest.fn();
      const app = new App([userPreferencesRoute]);
      return request(app.getServer())
        .put(`/api${userPreferencesRoute.path}/${userPreferenceId}`)
        .send(userPreferenceData);
    });
  });

  describe("[DELETE] /user-preferences/:id", () => {
    it("response Delete userPreference", async () => {
      const userPreferenceId = "60706478aad6c9ad19a31c84";

      const userPreferencesRoute = new UserPreferencesRoute();
      const userPreferences =
        userPreferencesRoute.userPreferencesController.userPreferencesService
          .userPreferences;

      userPreferences.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: "60706478aad6c9ad19a31c84",
        email: "test@email.com",
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([userPreferencesRoute]);
      return request(app.getServer())
        .delete(`/api${userPreferencesRoute.path}/${userPreferenceId}`)
        .expect(200);
    });
  });
});
