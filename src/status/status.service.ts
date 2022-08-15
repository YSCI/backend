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
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { StatusFilter } from './types/status-filter.type';

@Injectable()
export class StatusService extends BaseService<
  Status,
  StatusFilter,
  CreateStatusDto,
  UpdateStatusDto
> {
  constructor(@InjectRepository(Status) repository: Repository<Status>) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: StatusFilter,
  ): FindManyOptions<Status> {
    const where: FindOptionsWhere<Status> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Status>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Status> {
    return {};
  }
}
