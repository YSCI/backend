import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class GroupFilter extends Pagination {
  @IsOptional()
  @IsNumberString()
  public number?: string;

  @IsOptional()
  @IsNumberString()
  public auditorium?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public professionId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public currentSemester?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  public openedAt?: number;
}
