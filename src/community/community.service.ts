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
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';
import { CommunityFilter } from './types/community-filter.type';

@Injectable()
export class CommunityService extends BaseService<
  Community,
  CommunityFilter,
  CreateCommunityDto,
  UpdateCommunityDto
> {
  constructor(@InjectRepository(Community) repository: Repository<Community>) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: CommunityFilter,
  ): FindManyOptions<Community> {
    const where: FindOptionsWhere<Community> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.regionId) where.regionId = filters.regionId;
    if (filters.isFrontier) where.isFrontier = filters.isFrontier;

    return attachPagination<Community>(filters);
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Community> {
    return {
      region: true,
    };
  }
}
