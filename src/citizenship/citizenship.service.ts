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
import { CreateCitizenshipDto } from './dto/create-citizenship.dto';
import { UpdateCitizenshipDto } from './dto/update-citizenship.dto';
import { Citizenship } from './entities/citizenship.entity';
import { CitizenshipFilter } from './types/citizenship-filter.type';

@Injectable()
export class CitizenshipService extends BaseService<
  Citizenship,
  CitizenshipFilter,
  CreateCitizenshipDto,
  UpdateCitizenshipDto
> {
  constructor(
    @InjectRepository(Citizenship) repository: Repository<Citizenship>,
  ) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: CitizenshipFilter,
  ): FindManyOptions<Citizenship> {
    const where: FindOptionsWhere<Citizenship> = {};
    if (filters.country) where.country = ILike(filters.country + '%');

    return attachPagination<Citizenship>(filters);
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Citizenship> {
    return {};
  }
}
