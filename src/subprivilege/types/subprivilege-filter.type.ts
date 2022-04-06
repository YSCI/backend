import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class SubprivilegeFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public privilegeId: number;
}
