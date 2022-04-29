import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class UsersFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public surname: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public creatorId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public updaterId: number;
}
