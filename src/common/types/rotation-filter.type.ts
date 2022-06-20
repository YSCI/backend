import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsInt, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class RotationFilter extends Pagination {
  @IsInt()
  @Min(1)
  public professionId: number;

  @Type(() => Number)
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public studentSemesters: Array<number>;

  @Type(() => Number)
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public semestersForCalculation: Array<number>;
}
