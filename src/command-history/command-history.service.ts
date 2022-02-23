import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindCondition, Repository } from 'typeorm';
import { CommandHistory } from './entities/command-history.entity';
import { CommandHistoryFilter } from './types/command-history-filter.type';

@Injectable()
export class CommandHistoryService {
  @InjectRepository(CommandHistory)
  private readonly commandHistoryRepository: Repository<CommandHistory>;

  async create(createCommandHistoryDto: Partial<CommandHistory>) {
    return await this.commandHistoryRepository.save(createCommandHistoryDto);
  }

  async findAll(filters: CommandHistoryFilter) {
    const where: FindCondition<CommandHistory> = {};

    if (filters.commandId) where.commandId = filters.commandId;
    if (filters.studentId) where.studentId = filters.studentId;
    if (filters.userId) where.userId = filters.userId;

    const findOpts = attachPagination<CommandHistory>(filters);
    findOpts.where = where;
    findOpts.relations = ['command', 'user'];

    return await this.commandHistoryRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.commandHistoryRepository.findOne(id, {
      relations: ['command', 'user'],
    });
  }
}
