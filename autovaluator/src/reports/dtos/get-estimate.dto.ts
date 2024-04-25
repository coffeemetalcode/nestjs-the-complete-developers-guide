import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDTO {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2024)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(400000)
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lon: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
