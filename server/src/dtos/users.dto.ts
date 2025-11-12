import { IsMongoId, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsMongoId()
  public userId: string;

  @IsString()
  public password: string;
}
