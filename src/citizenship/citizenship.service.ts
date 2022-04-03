import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateCitizenshipDto } from './dto/create-citizenship.dto';
import { UpdateCitizenshipDto } from './dto/update-citizenship.dto';
import { Citizenship } from './entities/citizenship.entity';
import { CitizenshipFilter } from './types/citizenship-filter.type';

@Injectable()
export class CitizenshipService {
  @InjectRepository(Citizenship)
  private readonly citizenshipRepository: Repository<Citizenship>;

  async create(createCitizenshipDto: CreateCitizenshipDto) {
    return await this.citizenshipRepository.save(createCitizenshipDto);
  }

  async findAll(filters: CitizenshipFilter) {
    const where: FindOptionsWhere<Citizenship> = {};

    if (filters.country) where.country = ILike(filters.country + '%');

    const findOpts = attachPagination<Citizenship>(filters);
    findOpts.where = where;

    return await this.citizenshipRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.citizenshipRepository.findOneBy({ id });
  }

  async update(id: number, updateCitizenshipDto: UpdateCitizenshipDto) {
    const result = await this.citizenshipRepository.update(
      id,
      updateCitizenshipDto,
    );

    return !!result.affected;
  }

  async remove(id: number) {
    const result = await this.citizenshipRepository.delete(id);

    return !!result.affected;
  }
}
