import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateCommissariatDto } from './dto/create-commissariat.dto';
import { UpdateCommissariatDto } from './dto/update-commissariat.dto';
import { Commissariat } from './entities/commissariat.entity';
import { CommissariatFilter } from './types/commissariat-filter.type';

@Injectable()
export class CommissariatService {
  @InjectRepository(Commissariat)
  private readonly commissariatRepository: Repository<Commissariat>;

  async create(createCommissariatDto: CreateCommissariatDto) {
    return await this.commissariatRepository.save(createCommissariatDto);
  }

  async findAll(filters: CommissariatFilter) {
    const where: FindOptionsWhere<Commissariat> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.number) where.number = filters.number;
    if (filters.description)
      where.description = ILike('%' + filters.description + '%');

    const findOpts = attachPagination<Commissariat>(filters);
    findOpts.where = where;

    return await this.commissariatRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.commissariatRepository.findOneBy({ id });
  }

  async update(id: number, updateCommissariatDto: UpdateCommissariatDto) {
    const result = await this.commissariatRepository.update(
      id,
      updateCommissariatDto,
    );

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.commissariatRepository.delete(ids);

    return !!result.affected;
  }
}
