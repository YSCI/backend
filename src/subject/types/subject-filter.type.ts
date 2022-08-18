import {
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class SubjectFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public professionId?: number;

  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public semesters?: Array<number>;

  @IsOptional()
  @IsNumber()
  public number?: number;
}
