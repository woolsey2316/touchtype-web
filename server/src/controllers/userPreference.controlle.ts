import { NextFunction, Request, Response } from "express";
import { CreateUserPreferenceDto } from "@dtos/userPreference.dto";
import { UserPreference } from "@interfaces/userPreference.interface";
import UserPreferenceService from "@services/userPreference.service";

class UserPreferencesController {
  public userPreferenceService = new UserPreferenceService();

  public getUserPreferenceByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const email: string = req.params.email;
      const findOneUserPreferenceData: UserPreference =
        await this.userPreferenceService.findUserPreferenceByEmail(email);

      res
        .status(200)
        .json({ data: findOneUserPreferenceData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUserPreference = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userPreferenceData: CreateUserPreferenceDto = req.body;
      const createUserPreferenceData: UserPreference =
        await this.userPreferenceService.createUserPreference(
          userPreferenceData,
        );

      res
        .status(201)
        .json({ data: createUserPreferenceData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateUserPreference = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userPreferenceId: string = req.params.id;
      const userPreferenceData: CreateUserPreferenceDto = req.body;
      const updateuserPreferenceData: UserPreference =
        await this.userPreferenceService.updateUserPreference(
          userPreferenceId,
          userPreferenceData,
        );

      res
        .status(200)
        .json({ data: updateuserPreferenceData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUserPreference = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userPreferenceId: string = req.params.id;
      const deleteuserPreferenceData: UserPreference =
        await this.userPreferenceService.deleteUserPreference(userPreferenceId);

      res
        .status(200)
        .json({ data: deleteuserPreferenceData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default UserPreferencesController;
