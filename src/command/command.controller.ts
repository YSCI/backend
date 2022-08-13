import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Request,
} from '@nestjs/common';
import { CommandHistoryService } from 'src/command-history/command-history.service';
import { CommandHistory } from 'src/command-history/entities/command-history.entity';
import { AttachCommandDto } from 'src/command/dto/attach-command.dto';
import { BaseController } from 'src/common/base/controller.base';
import { PropertyHelpers } from 'src/common/helpers/property.helper';
import { IOk } from 'src/common/types/ok.type';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { StudentService } from 'src/student/student.service';
import { CommandService } from './command.service';
import { AcceptCommandDto } from './dto/accept-command.dto';
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
> {
  constructor(
    commandService: CommandService,
    private readonly commandHistoryService: CommandHistoryService,
    private readonly studentService: StudentService,
  ) {
    super(commandService);
  }

  @Post('attach')
  async attach(@Request() req, @Body() attachDto: AttachCommandDto) {
    // TODO: select only status id
    const command = await this.service.findOne(attachDto.commandId);

    if (!command) {
      throw new NotFoundException('Command not found');
    }

    const changeableColumns: UpdateStudentDto = {};
    if (command.changeableColumns) {
      for (const key in command.changeableColumns) {
        changeableColumns[key] =
          attachDto.changeableColumns?.[key] ?? command.changeableColumns[key];

        if (PropertyHelpers.isNullOrUndefined(changeableColumns[key])) {
          throw new BadRequestException(
            `You must fill the required column. Column name: ${key}`,
          );
        }
      }
    }

    const studentsCommands = attachDto.studentIds.map<Partial<CommandHistory>>(
      (id) => ({
        commandId: attachDto.commandId,
        commandNumber: attachDto.commandNumber,
        studentId: id,
        userId: req.user.id,
        description: attachDto.description,
        affectDate: attachDto.affectDate,
        changeableColumns,
      }),
    );

    await this.commandHistoryService.create(studentsCommands);

    return studentsCommands;
  }

  @Post('accept')
  async accept(
    @Body() { studentCommandId, accept }: AcceptCommandDto,
  ): Promise<IOk> {
    const command = await this.commandHistoryService.findOne(studentCommandId);

    if (!command) {
      throw new NotFoundException('Command not found');
    }

    if (accept && command.changeableColumns) {
      await this.studentService.update(
        command.studentId,
        command.changeableColumns,
      );
    }

    await this.commandHistoryService.setAccepted(studentCommandId, accept);

    return { ok: true };
  }
}
