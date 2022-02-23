import { IsInt, IsOptional, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class CommandHistoryFilter extends Pagination {
  @IsOptional()
  @IsInt()
  @Min(1)
  public commandId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public studentId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public userId: number;
}
