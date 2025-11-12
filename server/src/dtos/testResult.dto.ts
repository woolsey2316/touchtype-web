import { IsOptional, IsMongoId, IsString, IsNumber } from "class-validator";

export class CreateTestResultDto {
  @IsMongoId()
  public userId: string;

  @IsNumber()
  public wpm: string;

  @IsNumber()
  public time: number;

  @IsNumber()
  public score: number;

  @IsNumber()
  public accuracy: number;

  @IsString()
  public testType: string;

  @IsOptional()
  @IsNumber()
  public lowercaseWPM?: number;

  @IsOptional()
  @IsNumber()
  public symbolWPM?: number;
}
