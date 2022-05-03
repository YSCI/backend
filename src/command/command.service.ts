import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entities/command.entity';
import { CommandFilter } from './types/command-filter.type';

@Injectable()
export class CommandService {
  @InjectRepository(Command)
  private readonly commandRepository: Repository<Command>;

  async create(createCommandDto: CreateCommandDto) {
    return await this.commandRepository.save(createCommandDto);
  }

  async findAll(filters: CommandFilter): Promise<IFindResult<Command>> {
    const where: FindOptionsWhere<Command> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Command>(filters);
    findOpts.where = where;

    const [data, total] = await this.commandRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    return await this.commandRepository.findOneBy({ id });
  }

  async update(id: number, updateCommandDto: UpdateCommandDto) {
    const result = await this.commandRepository.update(id, updateCommandDto);

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.commandRepository.delete(ids);

    return !!result.affected;
  }
}
