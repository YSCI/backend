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
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { UpdateHealthStatusDto } from './dto/update-health-status.dto';
import { HealthStatusService } from './health-status.service';
import { HealthStatusFilter } from './types/health-status-filter.type';

@Controller('health-status')
export class HealthStatusController {
  constructor(private readonly healthStatusService: HealthStatusService) {}

  @Post()
  async create(@Body() createHealthStatusDto: CreateHealthStatusDto) {
    return await this.healthStatusService.create(createHealthStatusDto);
  }

  @Get()
  async findAll(@Query() filters: HealthStatusFilter) {
    return await this.healthStatusService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const healthStatus = await this.healthStatusService.findOne(id);

    if (!healthStatus) {
      throw new NotFoundException('HealthStatus not found');
    }

    return healthStatus;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateHealthStatusDto: UpdateHealthStatusDto,
  ): Promise<IOk> {
    const result = await this.healthStatusService.update(
      id,
      updateHealthStatusDto,
    );

    if (!result) {
      throw new NotFoundException('HealthStatus not found');
    }

    return { ok: true };
  }

  @Delete(':id')
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.healthStatusService.remove(id);

    if (!result) {
      throw new NotFoundException('HealthStatus not found');
    }

    return { ok: true };
  }
}
