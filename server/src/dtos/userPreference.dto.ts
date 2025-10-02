import { IsEmail, IsString } from "class-validator";

export class CreateUserPreferenceDto {
  @IsEmail()
  public email: string;

  @IsString()
  public mode: String;

  @IsString()
  spaceCharacter: String;

  @IsString()
  zipperAnimation: Boolean;

  @IsString()
  cursorCharacter: String;

  @IsString()
  smoothCursor: Boolean;

  @IsString()
  fontFamily: String;
}
