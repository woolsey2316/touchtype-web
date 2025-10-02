import { CreateUserPreferenceDto } from "@dtos/userPreference.dto";
import { HttpException } from "@exceptions/HttpException";
import { UserPreference } from "@interfaces/userPreference.interface";
import userPreferenceModel from "@models/userPreference.model";
import { isEmpty } from "@utils/util";

class UserPreferenceService {
  public userPreferences = userPreferenceModel;

  public async findUserPreferenceByEmail(
    userPreferenceId: string,
  ): Promise<UserPreference> {
    if (isEmpty(userPreferenceId))
      throw new HttpException(400, "userPreferenceId is empty");

    const findUserPreference: UserPreference =
      await this.userPreferences.findOne({ _id: userPreferenceId });
    if (!findUserPreference)
      throw new HttpException(409, "userPreference doesn't exist");

    return findUserPreference;
  }

  public async createUserPreference(
    userPreferenceData: CreateUserPreferenceDto,
  ): Promise<UserPreference> {
    if (isEmpty(userPreferenceData))
      throw new HttpException(400, "userPreferenceData is empty");

    const findUserPreference: UserPreference =
      await this.userPreferences.findOne({ email: userPreferenceData.email });
    if (findUserPreference)
      throw new HttpException(
        409,
        `This email ${userPreferenceData.email} already exists`,
      );

    const createuserPreferenceData: UserPreference =
      await this.userPreferences.create({
        ...userPreferenceData,
      });

    return createuserPreferenceData;
  }

  public async updateUserPreference(
    userPreferenceId: string,
    userPreferenceData: CreateUserPreferenceDto,
  ): Promise<UserPreference> {
    if (isEmpty(userPreferenceData))
      throw new HttpException(400, "userPreferenceData is empty");

    if (userPreferenceData.email) {
      const findUserPreference: UserPreference =
        await this.userPreferences.findOne({
          email: userPreferenceData.email,
        });
      if (findUserPreference && findUserPreference._id != userPreferenceId)
        throw new HttpException(
          409,
          `This email ${userPreferenceData.email} already exists`,
        );
    }

    const updateUserPreferenceById: UserPreference =
      await this.userPreferences.findByIdAndUpdate(userPreferenceId, {
        userPreferenceData,
      });
    if (!updateUserPreferenceById)
      throw new HttpException(409, "userPreference doesn't exist");

    return updateUserPreferenceById;
  }

  public async deleteUserPreference(
    userPreferenceId: string,
  ): Promise<UserPreference> {
    const deleteUserPreferenceById: UserPreference =
      await this.userPreferences.findByIdAndDelete(userPreferenceId);
    if (!deleteUserPreferenceById)
      throw new HttpException(409, "userPreference doesn't exist");

    return deleteUserPreferenceById;
  }
}

export default UserPreferenceService;
