import { IsEmail, IsString } from "class-validator";

export class CreateTestResultDto {
  @IsEmail()
  public email: string;

  @IsString()
  public wpm: string;

  @IsString()
  public score: string;

  @IsString()
  public accuracy: string;

  @IsString()
  public testType: string;
}
