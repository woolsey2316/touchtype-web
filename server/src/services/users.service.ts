import { CreateUserDto } from "@dtos/users.dto.js";
import { HttpException } from "@exceptions/HttpException.js";
import { User } from "@interfaces/users.interface.js";
import userModel from "@models/users.model.js";
import { isEmpty } from "@utils/util.js";

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");

    const findUser: User = await this.users.findOne({ userId });

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async findOrCreateUser(userId: string, email: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");
    if (isEmpty(email)) throw new HttpException(400, "Email is empty");

    // Try to find user by userId first
    let findUser: User = await this.users.findOne({ userId });

    // If user doesn't exist, create them
    if (!findUser) {
      findUser = await this.users.create({
        userId,
        email,
      });
    }

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
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

  public async updateUser(
    userId: string,
    userData: CreateUserDto,
  ): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    if (userData.email) {
      const findUser: User = await this.users.findOne({
        email: userData.email,
      });
      if (findUser && findUser.userId != userId)
        throw new HttpException(
          409,
          `This email ${userData.email} already exists`,
        );
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, {
      userData,
    });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
