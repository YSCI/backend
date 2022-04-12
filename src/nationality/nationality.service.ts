import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { Nationality } from './entities/nationality.entity';
import { NationalityFilter } from './types/nationality-filter.type';

@Injectable()
export class NationalityService {
  @InjectRepository(Nationality)
  private readonly nationalityRepository: Repository<Nationality>;

  async create(createNationalityDto: CreateNationalityDto) {
    return await this.nationalityRepository.save(createNationalityDto);
  }

  async findAll(filters: NationalityFilter) {
    const where: FindOptionsWhere<Nationality> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Nationality>(filters);
    findOpts.where = where;

    return await this.nationalityRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.nationalityRepository.findOneBy({ id });
  }

  async update(id: number, updateNationalityDto: UpdateNationalityDto) {
    const result = await this.nationalityRepository.update(
      id,
      updateNationalityDto,
    );

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.nationalityRepository.delete(ids);

    return !!result.affected;
  }
}
