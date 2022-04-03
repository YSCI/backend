import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
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

  async findAll(filters: CommunityFilter) {
    const where: FindOptionsWhere<Community> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.regionId) where.regionId = filters.regionId;

    const findOpts = attachPagination<Community>(filters);
    findOpts.where = where;

    return await this.communityRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.communityRepository.findOneBy({ id });
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto) {
    const result = await this.communityRepository.update(
      id,
      updateCommunityDto,
    );

    return !!result.affected;
  }

  async remove(id: number) {
    const result = await this.communityRepository.delete(id);

    return !!result.affected;
  }
}
