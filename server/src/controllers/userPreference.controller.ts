import { NextFunction, Request, Response } from "express";
import { CreateUserPreferencesDto } from "@dtos/userPreference.dto.js";
import { UserPreferences } from "@interfaces/userPreference.interface.js";
import userPreferenceService from "@services/userPreference.service.js";

class UserPreferencesController {
  public userPreferenceService = new userPreferenceService();

  public getUserPreferencesById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.params.id;
      const findOneUserPreferenceData: UserPreferences =
        await this.userPreferenceService.findUserPreferencesById(userId);

      res
        .status(200)
        .json({ data: findOneUserPreferenceData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUserPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userPreferencesData: CreateUserPreferencesDto = req.body;
      const createUserPreferenceData: UserPreferences =
        await this.userPreferenceService.createUserPreferences(
          userPreferencesData,
        );

      res
        .status(201)
        .json({ data: createUserPreferenceData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateUserPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserPreferencesDto = req.body;
      const updateUserData: UserPreferences =
        await this.userPreferenceService.updateUserPreferences(
          userId,
          userData,
        );

      res.status(200).json({ data: updateUserData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUserPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: UserPreferences =
        await this.userPreferenceService.deleteUserPreferences(userId);

      res.status(200).json({ data: deleteUserData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default UserPreferencesController;
