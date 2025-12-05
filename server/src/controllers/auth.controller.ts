import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/users.dto.js";
import { User } from "@interfaces/users.interface.js";
import AuthService from "@services/auth.service.js";

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: "signup" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
