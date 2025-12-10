import { IsEmail, IsString, IsBoolean } from "class-validator";

export class CreateUserPreferencesDto {
  @IsString()
  public userId: string;

  @IsEmail()
  public email: string;

  @IsString()
  public mode: string;

  @IsBoolean()
  public zipperEnabled: boolean;

  @IsString()
  public spaceChar: string;

  @IsBoolean()
  public skipOverTabs: boolean;

  @IsString()
  public cursorChar: string;

  @IsBoolean()
  public smoothCursor: boolean;
}
