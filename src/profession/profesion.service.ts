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
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { Profession } from './entities/profession.entity';
import { ProfessionsFilter } from './types/profession-filter.type';

@Injectable()
export class ProfessionService extends BaseService<
  Profession,
  ProfessionsFilter,
  CreateProfessionDto,
  UpdateProfessionDto
> {
  constructor(
    @InjectRepository(Profession) repository: Repository<Profession>,
  ) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: ProfessionsFilter,
  ): FindManyOptions<Profession> {
    const where: FindOptionsWhere<Profession> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.code) where.code = ILike(filters.code + '%');
    if (filters.abbreviation)
      where.abbreviation = ILike(filters.abbreviation + '%');
    if (filters.yearsCount) where.yearsCount = filters.yearsCount;
    if (filters.number) where.number = filters.number;
    if (filters.fee) where.fee = filters.fee;
    if (filters.freePlacesCount)
      where.freePlacesCount = filters.freePlacesCount;

    const findOpts = attachPagination<Profession>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Profession> {
    return {};
  }
}
