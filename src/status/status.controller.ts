import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';
import { StatusFilter } from './types/status-filter.type';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create(@Body() createStatusDto: CreateStatusDto) {
    return await this.statusService.create(createStatusDto);
  }

  @Get()
  async findAll(@Query() filters: StatusFilter) {
    return await this.statusService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const status = await this.statusService.findOne(id);

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    return status;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<IOk> {
    const result = await this.statusService.update(id, updateStatusDto);

    if (!result) {
      throw new NotFoundException('Status not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.statusService.remove(ids);

    if (!result) {
      throw new NotFoundException('Status not found');
    }

    return { ok: true };
  }
}
