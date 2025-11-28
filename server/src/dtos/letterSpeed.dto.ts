import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from "class-validator";

export class LetterSummary {
  @IsString()
  public letter: string;

  @IsNumber()
  public avgTimeMs: number;
}

export class CreateLetterSpeedDto {
  @IsString()
  public userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LetterSummary)
  public summaries: LetterSummary[];
}
