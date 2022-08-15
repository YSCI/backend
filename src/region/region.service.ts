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
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { RegionFilter } from './types/region-filter.type';

@Injectable()
export class RegionService extends BaseService<
  Region,
  RegionFilter,
  CreateRegionDto,
  UpdateRegionDto
> {
  constructor(@InjectRepository(Region) repository: Repository<Region>) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: RegionFilter,
  ): FindManyOptions<Region> {
    const where: FindOptionsWhere<Region> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Region>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Region> {
    return {
      communities: true,
    };
  }
}
