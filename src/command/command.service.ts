import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
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

  async findAll(filters: CommandFilter) {
    const where: FindOptionsWhere<Command> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.changeableStatusId)
      where.changeableStatusId = filters.changeableStatusId;

    const findOpts = attachPagination<Command>(filters);
    findOpts.where = where;

    return await this.commandRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.commandRepository.findOneBy({ id });
  }

  async update(id: number, updateCommandDto: UpdateCommandDto) {
    const result = await this.commandRepository.update(id, updateCommandDto);

    return !!result.affected;
  }

  async remove(id: number) {
    const result = await this.commandRepository.delete(id);

    return !!result.affected;
  }
}
