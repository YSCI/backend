import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
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

  async findAll(filters: RegionFilter): Promise<IFindResult<Region>> {
    const where: FindOptionsWhere<Region> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Region>(filters);
    findOpts.where = where;
    findOpts.relations = {
      communities: true,
    };

    const [data, total] = await this.regionRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    return await this.regionRepository.findOneBy({ id });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const result = await this.regionRepository.update(id, updateRegionDto);

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.regionRepository.delete(ids);

    return !!result.affected;
  }
}
