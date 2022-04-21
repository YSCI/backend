import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { StatusFilter } from './types/status-filter.type';

@Injectable()
export class StatusService {
  @InjectRepository(Status)
  private readonly statusRepository: Repository<Status>;

  async create(createStatusDto: CreateStatusDto) {
    return await this.statusRepository.save(createStatusDto);
  }

  async findAll(filters: StatusFilter): Promise<IFindResult<Status>> {
    const where: FindOptionsWhere<Status> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Status>(filters);
    findOpts.where = where;

    const [data, total] = await this.statusRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    return await this.statusRepository.findOneBy({ id });
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const result = await this.statusRepository.update(id, updateStatusDto);

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.statusRepository.delete(ids);

    return !!result.affected;
  }
}
