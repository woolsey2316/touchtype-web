import { Filter } from "bad-words";
import { HttpException } from "@exceptions/HttpException.js";
import userModel from "@models/users.model.js";

class UsernameService {
  private filter: Filter;
  public users = userModel;

  constructor() {
    this.filter = new Filter();
  }

  public async validateUsername(username: string): Promise<void> {
    // Check for bad words
    if (this.filter.isProfane(username)) {
      throw new HttpException(400, "Username contains inappropriate language");
    }

    // Check if username already exists
    const existingUser = await this.users.findOne({ username });
    if (existingUser) {
      throw new HttpException(409, "Username already taken");
    }
  }

  public async updateUsername(userId: string, username: string): Promise<void> {
    // Validate username
    await this.validateUsername(username);

    // Update user with username
    const updateResult = await this.users.findOneAndUpdate(
      { userId },
      { username },
      { new: true },
    );

    if (!updateResult) {
      throw new HttpException(404, "User not found");
    }
  }

  public async checkUsernameAvailability(username: string): Promise<boolean> {
    // Check for bad words
    if (this.filter.isProfane(username)) {
      return false;
    }

    // Check if username exists
    const existingUser = await this.users.findOne({ username });
    return !existingUser;
  }
}

export default UsernameService;
