import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateCommandHistoryDto } from './dto/create-command-history.dto';
import { UpdateCommandHistoryDto } from './dto/update-command-history.dto';
import { CommandHistory } from './entities/command-history.entity';
import { CommandHistoryFilter } from './types/command-history-filter.type';

@Injectable()
export class CommandHistoryService extends BaseService<
  CommandHistory,
  CommandHistoryFilter,
  CreateCommandHistoryDto,
  UpdateCommandHistoryDto
> {
  constructor(
    @InjectRepository(CommandHistory) repository: Repository<CommandHistory>,
  ) {
    super(repository);
  }

  async accept(id: number) {
    const result = await this.repository.update(id, {
      isAccepted: true,
    });

    return !!result.affected;
  }

  protected getFiltersConfiguration(
    filters: CommandHistoryFilter,
  ): FindManyOptions<CommandHistory> {
    const where: FindOptionsWhere<CommandHistory> = {};

    if (filters.commandId) where.commandId = filters.commandId;
    if (filters.studentId) where.studentId = filters.studentId;
    if (filters.userId) where.userId = filters.userId;
    if (filters.isAccepted) where.isAccepted = filters.isAccepted;

    const findOpts = attachPagination<CommandHistory>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<CommandHistory> {
    return {
      student: true,
      command: true,
      user: true,
    };
  }
}
