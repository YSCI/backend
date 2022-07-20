import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';
import { CommunityFilter } from './types/community-filter.type';

@Injectable()
export class CommunityService {
  @InjectRepository(Community)
  private readonly communityRepository: Repository<Community>;

  async create(createCommunityDto: CreateCommunityDto) {
    return await this.communityRepository.save(createCommunityDto);
  }

  async findAll(filters: CommunityFilter): Promise<IFindResult<Community>> {
    const where: FindOptionsWhere<Community> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.regionId) where.regionId = filters.regionId;
    if (filters.isFrontier) where.isFrontier = filters.isFrontier;

    const findOpts = attachPagination<Community>(filters);
    findOpts.where = where;
    findOpts.relations = {
      region: true,
    };

    const [data, total] = await this.communityRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    const [community] = await this.communityRepository.find({
      where: { id },
      relations: {
        region: true,
      },
    });

    return community;
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto) {
    const result = await this.communityRepository.update(
      id,
      updateCommunityDto,
    );

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.communityRepository.delete(ids);

    return !!result.affected;
  }
}
