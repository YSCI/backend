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
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';
import { StudentFilter } from './types/student-filter.type';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(@Query() filters: StudentFilter) {
    return await this.studentService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const student = await this.studentService.findOne(id);

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<IOk> {
    const result = await this.studentService.update(id, updateStudentDto);

    if (!result) {
      throw new NotFoundException('Student not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.studentService.remove(ids);

    if (!result) {
      throw new NotFoundException('Student not found');
    }

    return { ok: true };
  }
}
