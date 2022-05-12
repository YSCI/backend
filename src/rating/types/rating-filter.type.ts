import { IsInt, IsOptional, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class RatingFilter extends Pagination {
  @IsOptional()
  @IsInt()
  @Min(1)
  public studentId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public subjectId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public semester: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public rate: number;
}
