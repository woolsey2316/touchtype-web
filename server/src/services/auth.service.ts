import { CreateUserDto } from "@dtos/users.dto.js";
import { HttpException } from "@exceptions/HttpException.js";
import { TokenData } from "@interfaces/auth.interface.js";
import { User } from "@interfaces/users.interface.js";
import userModel from "@models/users.model.js";
import { isEmpty } from "@utils/util.js";

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`,
      );

    const createUserData: User = await this.users.create({
      ...userData,
    });

    return createUserData;
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
