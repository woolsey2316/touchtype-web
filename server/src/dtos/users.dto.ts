import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public userId: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: "Username must be at least 3 characters long" })
  @MaxLength(20, { message: "Username must be at most 20 characters long" })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      "Username can only contain letters, numbers, underscores, and hyphens",
  })
  public username?: string;

  @IsString()
  public allTimeBestTestId: string;

  @IsString()
  public dailyBestTestId: string;
}

export class UpdateUsernameDto {
  @IsString()
  @MinLength(3, { message: "Username must be at least 3 characters long" })
  @MaxLength(20, { message: "Username must be at most 20 characters long" })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      "Username can only contain letters, numbers, underscores, and hyphens",
  })
  public username: string;
}
