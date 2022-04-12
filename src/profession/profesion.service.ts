import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { Profession } from './entities/profession.entity';
import { ProfessionsFilter } from './types/profession-filter.type';

@Injectable()
export class ProfessionService {
  @InjectRepository(Profession)
  private readonly professionsRepository: Repository<Profession>;

  async create(createProfessionDto: CreateProfessionDto) {
    return await this.professionsRepository.save(createProfessionDto);
  }

  async findAll(filters: ProfessionsFilter) {
    const where: FindOptionsWhere<Profession> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.code) where.code = ILike(filters.code + '%');
    if (filters.abbreviation)
      where.abbreviation = ILike(filters.abbreviation + '%');
    if (filters.yearsCount) where.yearsCount = filters.yearsCount;
    if (filters.number) where.number = filters.number;
    if (filters.fee) where.fee = filters.fee;

    return await this.professionsRepository.find({
      where,
      take: filters.limit,
      skip: filters.offset,
      order: {
        [filters.orderBy]: filters.orderDirection,
      },
    });
  }

  async findOne(id: number) {
    return await this.professionsRepository.findOneBy({ id });
  }

  async update(id: number, updateProfessionDto: UpdateProfessionDto) {
    const result = await this.professionsRepository.update(
      id,
      updateProfessionDto,
    );

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.professionsRepository.delete(ids);

    return !!result.affected;
  }
}
