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
import { CitizenshipService } from './citizenship.service';
import { CreateCitizenshipDto } from './dto/create-citizenship.dto';
import { UpdateCitizenshipDto } from './dto/update-citizenship.dto';
import { CitizenshipFilter } from './types/citizenship-filter.type';

@Controller('citizenship')
export class CitizenshipController {
  constructor(private readonly citizenshipService: CitizenshipService) {}

  @Post()
  async create(@Body() createCitizenshipDto: CreateCitizenshipDto) {
    return await this.citizenshipService.create(createCitizenshipDto);
  }

  @Get()
  async findAll(@Query() filters: CitizenshipFilter) {
    return await this.citizenshipService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const citizenship = await this.citizenshipService.findOne(id);

    if (!citizenship) {
      throw new NotFoundException('Citizenship not found');
    }

    return citizenship;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateCitizenshipDto: UpdateCitizenshipDto,
  ): Promise<IOk> {
    const result = await this.citizenshipService.update(
      id,
      updateCitizenshipDto,
    );

    if (!result) {
      throw new NotFoundException('Citizenship not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.citizenshipService.remove(ids);

    if (!result) {
      throw new NotFoundException('Citizenship not found');
    }

    return { ok: true };
  }
}
