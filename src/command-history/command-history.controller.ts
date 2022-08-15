import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CommandService } from 'src/command/command.service';
import { BaseController } from 'src/common/base/controller.base';
import { PropertyHelpers } from 'src/common/helpers/property.helper';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { IOk } from 'src/common/types/ok.type';
import { Request } from 'src/common/types/request.type';
import { StudentService } from 'src/student/student.service';
import { CommandHistoryService } from './command-history.service';
import { AcceptCommandDto } from './dto/accept-command.dto';
import { CreateBulkCommandHistoryDto } from './dto/create-bulk-command-history.dto';
import { CreateCommandHistoryDto } from './dto/create-command-history.dto';
import { UpdateCommandHistoryDto } from './dto/update-command-history.dto';
import { CommandHistory } from './entities/command-history.entity';
import { CommandHistoryFilter } from './types/command-history-filter.type';

@Controller('command-history')
export class CommandHistoryController extends BaseController<
  CommandHistory,
  CommandHistoryFilter,
  CreateCommandHistoryDto,
  UpdateCommandHistoryDto,
  CommandHistoryService
>(CreateBulkCommandHistoryDto, UpdateCommandHistoryDto, CommandHistoryFilter) {
  constructor(
    service: CommandHistoryService,
    private readonly commandService: CommandService,
    private readonly studentService: StudentService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    super(service, CommandHistory.name);
  }

  @Post()
  async create(@Body() dto: CreateBulkCommandHistoryDto) {
    const command = await this.commandService.findOne(dto.commandId);

    if (!command) {
      throw new NotFoundException('Command not found');
    }

    const changeableColumns = {};
    if (command.changeableColumns) {
      for (const key in command.changeableColumns) {
        changeableColumns[key] =
          dto.changeableColumns?.[key] ?? command.changeableColumns[key];

        if (PropertyHelpers.isNullOrUndefined(changeableColumns[key])) {
          throw new BadRequestException(
            `You must fill the required column. Column name: ${key}`,
          );
        }
      }
    }

    const studentsCommands = dto.studentIds.map<CreateCommandHistoryDto>(
      (id) => ({
        commandId: dto.commandId,
        commandNumber: dto.commandNumber,
        studentId: id,
        userId: this.request.user.id,
        description: dto.description,
        affectDate: dto.affectDate,
        changeableColumns,
      }),
    );

    return (await this.service.create(studentsCommands)) as any; // temporary solution
  }

  @Post('accept')
  @HttpCode(HttpStatus.OK)
  async accept(@Body() { studentCommandId }: AcceptCommandDto): Promise<IOk> {
    const command = await this.service.findOne(studentCommandId);

    if (!command) {
      throw new NotFoundException('Command History not found');
    }

    if (command.changeableColumns) {
      const student = await this.studentService.findOne(command.studentId);
      const changeableColumnsOldValues = {};

      for (const key in command.changeableColumns) {
        changeableColumnsOldValues[key] = student[key];
      }

      await this.studentService.update(
        command.studentId,
        command.changeableColumns,
      );

      await this.service.update(studentCommandId, {
        changeableColumnsOldValues,
      });
    }

    await this.service.accept(studentCommandId);

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const removedCommands = await this.service.removeReturningAll(ids);

    if (!removedCommands?.length) {
      throw new NotFoundException(`${this.resourceName} not found`);
    }

    const promises: Array<Promise<boolean>> = [];
    for (const command of removedCommands) {
      if (command.changeableColumnsOldValues)
        promises.push(
          this.studentService.update(
            command.studentId,
            command.changeableColumnsOldValues,
          ),
        );
    }
    await Promise.all(promises);

    return { ok: true };
  }
}
