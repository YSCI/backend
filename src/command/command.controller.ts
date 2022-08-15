import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entities/command.entity';
import { CommandFilter } from './types/command-filter.type';

@Controller('command')
export class CommandController extends BaseController<
  Command,
  CommandFilter,
  CreateCommandDto,
  UpdateCommandDto,
  CommandService
>(CreateCommandDto, UpdateCommandDto, CommandFilter) {
  constructor(commandService: CommandService) {
    super(commandService, Command.name);
  }
}
