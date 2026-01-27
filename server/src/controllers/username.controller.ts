import { NextFunction, Request, Response } from "express";
import { UpdateUsernameDto } from "@dtos/users.dto.js";
import UsernameService from "@services/username.service.js";

class UsernameController {
  public usernameService = new UsernameService();

  public updateUsername = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.params.id;
      const { username }: UpdateUsernameDto = req.body;

      await this.usernameService.updateUsername(userId, username);

      res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  public checkUsernameAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username } = req.query;

      if (typeof username !== "string") {
        return res.status(400).json({ message: "Username must be a string" });
      }

      const isAvailable =
        await this.usernameService.checkUsernameAvailability(username);

      res.status(200).json({ available: isAvailable });
    } catch (error) {
      next(error);
    }
  };
}

export default UsernameController;
