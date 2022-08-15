import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { UpdateHealthStatusDto } from './dto/update-health-status.dto';
import { HealthStatus } from './entities/health-status.entity';
import { HealthStatusFilter } from './types/health-status-filter.type';

@Injectable()
export class HealthStatusService extends BaseService<
  HealthStatus,
  HealthStatusFilter,
  CreateHealthStatusDto,
  UpdateHealthStatusDto
> {
  constructor(
    @InjectRepository(HealthStatus) repository: Repository<HealthStatus>,
  ) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: HealthStatusFilter,
  ): FindManyOptions<HealthStatus> {
    const where: FindOptionsWhere<HealthStatus> = {};
    if (filters.status) where.status = ILike(filters.status + '%');

    const findOpts = attachPagination<HealthStatus>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<HealthStatus> {
    return {};
  }
}
