import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entities/command.entity';
import { CommandFilter } from './types/command-filter.type';

@Injectable()
export class CommandService extends BaseService<
  Command,
  CommandFilter,
  CreateCommandDto,
  UpdateCommandDto
> {
  constructor(@InjectRepository(Command) repository: Repository<Command>) {
    super(repository);
  }

  protected getFiltersConfiguration(filters: CommandFilter) {
    const where: FindOptionsWhere<Command> = {};
    if (filters.name) where.name = ILike(filters.name + '%');

    return attachPagination<Command>(filters);
  }

  protected getRelationsConfiguration() {
    return {};
  }
}
