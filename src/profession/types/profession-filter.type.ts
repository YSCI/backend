import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class ProfessionsFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public code?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public abbreviation?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public yearsCount?: number;

  @IsOptional()
  @IsInt()
  public number?: number;

  @IsOptional()
  @IsDecimal()
  public fee: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  public freePlacesCount: number;
}
