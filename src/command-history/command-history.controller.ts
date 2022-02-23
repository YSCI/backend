import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PathParams } from 'src/common/types/path-params.type';
import { CommandHistoryService } from './command-history.service';
import { CommandHistoryFilter } from './types/command-history-filter.type';

@Controller('command-history')
export class CommandHistoryController {
  constructor(private readonly commandHistoryService: CommandHistoryService) {}

  @Get()
  async findAll(@Query() filters: CommandHistoryFilter) {
    return await this.commandHistoryService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const commandHistory = await this.commandHistoryService.findOne(id);

    if (!commandHistory) {
      throw new NotFoundException('CommandHistory not found');
    }

    return commandHistory;
  }
}
