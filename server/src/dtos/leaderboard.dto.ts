import { IsString, IsNumber, IsDateString } from "class-validator";

export class CreateLeaderboardEntryDto {
  @IsString()
  public userId: string;

  @IsString()
  public username: string;

  @IsNumber()
  public wpm: number;

  @IsDateString()
  public date: string;

  @IsNumber()
  public accuracy: number;

  @IsString()
  public testType: string;

  @IsString()
  public mode?: string;
}

export default CreateLeaderboardEntryDto;
