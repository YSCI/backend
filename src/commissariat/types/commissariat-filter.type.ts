import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class CommissariatFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsInt()
  public number: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;
}
