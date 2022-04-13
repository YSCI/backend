import { IsOptional, IsString } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class HealthStatusFilter extends Pagination {
  @IsOptional()
  @IsString()
  public status: string;
}
