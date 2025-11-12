import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  IsMongoId,
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
  @IsOptional()
  @IsMongoId()
  public userId?: string | null;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LetterSummary)
  public summaries: LetterSummary[];
}
