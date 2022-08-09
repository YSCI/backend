import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommandHistory } from './entities/command-history.entity';
import { CommandHistoryFilter } from './types/command-history-filter.type';

@Injectable()
export class CommandHistoryService {
  @InjectRepository(CommandHistory)
  private readonly commandHistoryRepository: Repository<CommandHistory>;

  async create(commandsToBeAttached: Partial<CommandHistory>[]) {
    return await this.commandHistoryRepository.save(commandsToBeAttached);
  }

  async findAll(
    filters: CommandHistoryFilter,
  ): Promise<IFindResult<CommandHistory>> {
    const where: FindOptionsWhere<CommandHistory> = {};

    if (filters.commandId) where.commandId = filters.commandId;
    if (filters.studentId) where.studentId = filters.studentId;
    if (filters.userId) where.userId = filters.userId;
    if (filters.isAccepted) where.isAccepted = filters.isAccepted;

    const findOpts = attachPagination<CommandHistory>(filters);
    findOpts.where = where;
    findOpts.relations = {
      student: true,
      command: true,
      user: true,
    };

    const [data, total] = await this.commandHistoryRepository.findAndCount(
      findOpts,
    );
    return { data, total };
  }

  async findOne(id: number) {
    const [result] = await this.commandHistoryRepository.find({
      where: { id },
      relations: {
        command: true,
        user: true,
      },
    });

    return result;
  }

  async setAccepted(id: number, value: boolean) {
    const result = await this.commandHistoryRepository.update(id, {
      isAccepted: value,
    });

    return !!result.affected;
  }
}
