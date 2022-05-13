import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProfessionDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public code: string;

  @IsString()
  @IsNotEmpty()
  public abbreviation: string;

  @IsInt()
  @Min(1)
  public yearsCount: number;

  @IsOptional()
  @IsInt()
  public number: number;

  @IsDecimal()
  public fee: string;

  @IsInt()
  @IsPositive()
  public freePlacesCount: number;
}
