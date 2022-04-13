import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class CommandFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public changeableStatusId: number;
}
