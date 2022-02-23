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
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ProfessionService } from './profesion.service';
import { ProfessionsFilter } from './types/profession-filter.type';

@Controller('profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Post()
  async create(@Body() createProfessionDto: CreateProfessionDto) {
    return await this.professionService.create(createProfessionDto);
  }

  @Get()
  async findAll(@Query() filters: ProfessionsFilter) {
    return await this.professionService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const profession = await this.professionService.findOne(id);

    if (!profession) throw new NotFoundException('Profession not found');

    return profession;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateProfessionDto: UpdateProfessionDto,
  ): Promise<IOk> {
    const result = await this.professionService.update(id, updateProfessionDto);

    if (!result) throw new NotFoundException('Profession not found');

    return { ok: true };
  }

  @Delete(':id')
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.professionService.remove(id);

    if (!result) throw new NotFoundException('Profession not found');

    return { ok: true };
  }
}
