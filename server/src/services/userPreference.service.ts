import { CreateUserPreferencesDto } from "@dtos/userPreference.dto.js";
import { HttpException } from "@exceptions/HttpException.js";
import { UserPreferences } from "@interfaces/userPreference.interface.js";
import UserPreferencesModel from "@models/userPreference.model.js";
import { isEmpty } from "@utils/util.js";

class UserPreferencesService {
  public userPreferences = UserPreferencesModel;

  public async findUserPreferencesById(
    userId: string,
  ): Promise<UserPreferences> {
    if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");

    const findUserPreferences: UserPreferences =
      await this.userPreferences.findOne({ userId });
    if (!findUserPreferences)
      throw new HttpException(409, "User doesn't exist");

    return findUserPreferences;
  }

  public async createUserPreferences(
    userPreferencesData: CreateUserPreferencesDto,
  ): Promise<UserPreferences> {
    if (isEmpty(userPreferencesData))
      throw new HttpException(400, "userData is empty");

    const findUserPreferences: UserPreferences =
      await this.userPreferences.findOne({ email: userPreferencesData.email });
    if (findUserPreferences)
      throw new HttpException(
        409,
        `This email ${userPreferencesData.email} already exists`,
      );

    const createUserPreferencesData: UserPreferences =
      await this.userPreferences.create({
        ...userPreferencesData,
      });

    return createUserPreferencesData;
  }

  public async updateUserPreferences(
    userId: string,
    userPreferencesData: CreateUserPreferencesDto,
  ): Promise<UserPreferences> {
    if (isEmpty(userPreferencesData))
      throw new HttpException(400, "userData is empty");

    if (userPreferencesData.email) {
      const findUserPreferences: UserPreferences =
        await this.userPreferences.findOne({
          userId: userId,
          email: userPreferencesData.email,
        });
      if (findUserPreferences && findUserPreferences.userId != userId)
        throw new HttpException(
          409,
          `This email ${userPreferencesData.email} already exists`,
        );
    }

    const updateUserPreferencesById: UserPreferences =
      await this.userPreferences.findByIdAndUpdate(userId, {
        userPreferencesData,
      });
    if (!updateUserPreferencesById)
      throw new HttpException(409, "User doesn't exist");

    return updateUserPreferencesById;
  }

  public async deleteUserPreferences(userId: string): Promise<UserPreferences> {
    const deleteUserPreferencesById: UserPreferences =
      await this.userPreferences.findByIdAndDelete(userId);
    if (!deleteUserPreferencesById)
      throw new HttpException(409, "User Preferences don't exist");

    return deleteUserPreferencesById;
  }
}

export default UserPreferencesService;
