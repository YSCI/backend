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
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionService } from './region.service';
import { RegionFilter } from './types/region-filter.type';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return await this.regionService.create(createRegionDto);
  }

  @Get()
  async findAll(@Query() filters: RegionFilter) {
    return await this.regionService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const region = await this.regionService.findOne(id);

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    return region;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<IOk> {
    const result = await this.regionService.update(id, updateRegionDto);

    if (!result) {
      throw new NotFoundException('Region not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.regionService.remove(ids);

    if (!result) {
      throw new NotFoundException('Region not found');
    }

    return { ok: true };
  }
}
