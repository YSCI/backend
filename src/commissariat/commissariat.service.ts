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
import { CreateCommissariatDto } from './dto/create-commissariat.dto';
import { UpdateCommissariatDto } from './dto/update-commissariat.dto';
import { Commissariat } from './entities/commissariat.entity';
import { CommissariatFilter } from './types/commissariat-filter.type';

@Injectable()
export class CommissariatService extends BaseService<
  Commissariat,
  CommissariatFilter,
  CreateCommissariatDto,
  UpdateCommissariatDto
> {
  constructor(
    @InjectRepository(Commissariat) repository: Repository<Commissariat>,
  ) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: CommissariatFilter,
  ): FindManyOptions<Commissariat> {
    const where: FindOptionsWhere<Commissariat> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.number) where.number = filters.number;
    if (filters.description)
      where.description = ILike('%' + filters.description + '%');

    return attachPagination<Commissariat>(filters);
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Commissariat> {
    return {};
  }
}
