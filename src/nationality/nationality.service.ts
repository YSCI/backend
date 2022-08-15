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
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { Nationality } from './entities/nationality.entity';
import { NationalityFilter } from './types/nationality-filter.type';

@Injectable()
export class NationalityService extends BaseService<
  Nationality,
  NationalityFilter,
  CreateNationalityDto,
  UpdateNationalityDto
> {
  constructor(
    @InjectRepository(Nationality) repository: Repository<Nationality>,
  ) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: NationalityFilter,
  ): FindManyOptions<Nationality> {
    const where: FindOptionsWhere<Nationality> = {};
    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Nationality>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Nationality> {
    return {};
  }
}
