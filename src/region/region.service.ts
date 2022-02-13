import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindCondition, ILike, Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { RegionFilter } from './types/region-filter.type';

@Injectable()
export class RegionService {
  @InjectRepository(Region)
  private readonly regionRepository: Repository<Region>;

  async create(createRegionDto: CreateRegionDto) {
    return await this.regionRepository.save(createRegionDto);
  }

  async findAll(filters: RegionFilter) {
    const where: FindCondition<Region> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Region>(filters);
    findOpts.where = where;

    return await this.regionRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.regionRepository.findOne(id);
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const result = await this.regionRepository.update(id, updateRegionDto);

    return !!result.affected;
  }

  async remove(id: number) {
    const result = await this.regionRepository.delete(id);

    return !!result.affected;
  }
}
