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
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { NationalityService } from './nationality.service';
import { NationalityFilter } from './types/nationality-filter.type';

@Controller('nationality')
export class NationalityController {
  constructor(private readonly nationalityService: NationalityService) {}

  @Post()
  async create(@Body() createNationalityDto: CreateNationalityDto) {
    return await this.nationalityService.create(createNationalityDto);
  }

  @Get()
  async findAll(@Query() filters: NationalityFilter) {
    return await this.nationalityService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const nationality = await this.nationalityService.findOne(id);

    if (!nationality) {
      throw new NotFoundException('Nationality not found');
    }

    return nationality;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateNationalityDto: UpdateNationalityDto,
  ): Promise<IOk> {
    const result = await this.nationalityService.update(
      id,
      updateNationalityDto,
    );

    if (!result) {
      throw new NotFoundException('Nationality not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.nationalityService.remove(ids);

    if (!result) {
      throw new NotFoundException('Nationality not found');
    }

    return { ok: true };
  }
}
