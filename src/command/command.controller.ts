import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CommandHistoryService } from 'src/command-history/command-history.service';
import { CommandHistory } from 'src/command-history/entities/command-history.entity';
import { AttachCommandDto } from 'src/command/dto/attach-command.dto';
import { PropertyHelpers } from 'src/common/helpers/property.helper';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { StudentService } from 'src/student/student.service';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { CommandFilter } from './types/command-filter.type';

@Controller('command')
export class CommandController {
  constructor(
    private readonly commandService: CommandService,
    private readonly commandHistoryService: CommandHistoryService,
    private readonly studentService: StudentService,
  ) {}

  @Post()
  async create(@Body() createCommandDto: CreateCommandDto) {
    return await this.commandService.create(createCommandDto);
  }

  @Get()
  async findAll(@Query() filters: CommandFilter) {
    return await this.commandService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const command = await this.commandService.findOne(id);

    if (!command) {
      throw new NotFoundException('Command not found');
    }

    return command;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateCommandDto: UpdateCommandDto,
  ): Promise<IOk> {
    const result = await this.commandService.update(id, updateCommandDto);

    if (!result) {
      throw new NotFoundException('Command not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.commandService.remove(ids);

    if (!result) {
      throw new NotFoundException('Command not found');
    }

    return { ok: true };
  }

  @Post('attach')
  async attach(@Request() req, @Body() attachDto: AttachCommandDto) {
    // TODO: select only status id
    const command = await this.commandService.findOne(attachDto.commandId);

    if (!command) {
      throw new NotFoundException('Command not found');
    }

    if (command.changeableColumns) {
      const changeableColumns: UpdateStudentDto = {};

      for (const key in command.changeableColumns) {
        changeableColumns[key] =
          attachDto.changeableColumns?.[key] ?? command.changeableColumns[key];

        if (PropertyHelpers.isNullOrUndefined(changeableColumns[key])) {
          throw new BadRequestException(
            `You must fill the required column. Column name: ${key}`,
          );
        }
      }

      await this.studentService.update(attachDto.studentIds, changeableColumns);
    }

    const studentsCommands = attachDto.studentIds.map<Partial<CommandHistory>>(
      (id) => ({
        commandId: attachDto.commandId,
        commandNumber: attachDto.commandNumber,
        studentId: id,
        userId: req.user.id,
      }),
    );

    await this.commandHistoryService.create(studentsCommands);

    return studentsCommands;
  }
}
