import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsInt, Min } from 'class-validator';

export class BatchDelete {
  @Type(() => Number)
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public ids: number[];
}
