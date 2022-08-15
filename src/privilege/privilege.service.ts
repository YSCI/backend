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
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { Privilege } from './entities/privilege.entity';
import { PrivilegeFilter } from './types/privilege-filter.type';

@Injectable()
export class PrivilegeService extends BaseService<
  Privilege,
  PrivilegeFilter,
  CreatePrivilegeDto,
  UpdatePrivilegeDto
> {
  constructor(@InjectRepository(Privilege) repository: Repository<Privilege>) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: PrivilegeFilter,
  ): FindManyOptions<Privilege> {
    const where: FindOptionsWhere<Privilege> = {};
    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Privilege>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Privilege> {
    return {};
  }
}
