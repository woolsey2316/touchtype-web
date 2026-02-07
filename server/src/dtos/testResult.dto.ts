import { IsOptional, IsString, IsNumber } from "class-validator";

export class CreateTestResultDto {
  @IsString()
  public userId: string;

  @IsNumber()
  public wpm: number;

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
  public lowercaseWpm?: number;

  @IsOptional()
  @IsNumber()
  public symbolWpm?: number;

  @IsOptional()
  @IsString()
  public mode?: string;
}
