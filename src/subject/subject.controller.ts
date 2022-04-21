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
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectService } from './subject.service';
import { SubjectFilter } from './types/subject-filter.type';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectService.create(createSubjectDto);
  }

  @Get()
  async findAll(@Query() filters: SubjectFilter) {
    return await this.subjectService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const subject = await this.subjectService.findOne(id);

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<IOk> {
    const result = await this.subjectService.update(id, updateSubjectDto);

    if (!result) {
      throw new NotFoundException('Subject not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.subjectService.remove(ids);

    if (!result) {
      throw new NotFoundException('Subject not found');
    }

    return { ok: true };
  }
}
