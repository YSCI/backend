import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindCondition, ILike, Repository } from 'typeorm';
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
    const where: FindCondition<Commissariat> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.number) where.number = filters.number;
    if (filters.communityId) where.communityId = filters.communityId;

    const findOpts = attachPagination<Commissariat>(filters);
    findOpts.where = where;

    return await this.commissariatRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.commissariatRepository.findOne(id);
  }

  async update(id: number, updateCommissariatDto: UpdateCommissariatDto) {
    const result = await this.commissariatRepository.update(
      id,
      updateCommissariatDto,
    );

    return !!result.affected;
  }

  async remove(id: number) {
    const result = await this.commissariatRepository.delete(id);

    return !!result.affected;
  }
}
