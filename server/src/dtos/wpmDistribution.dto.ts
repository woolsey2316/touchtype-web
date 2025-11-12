import { IsNumber, ValidateNested, IsArray, Min } from "class-validator";
import { Type } from "class-transformer";

export class WpmFrequencyDto {
  @IsNumber()
  public wpmRangeStart: number;

  @IsNumber()
  @Min(0)
  public count: number;
}

export class WpmDistributionDto {
  @IsNumber()
  public binSize: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WpmFrequencyDto)
  public frequencies: WpmFrequencyDto[];
}
