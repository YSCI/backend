import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DateTime } from 'luxon';
import { BaseController } from 'src/common/base/controller.base';
import { ResponseHelpers } from 'src/common/helpers/response.helper';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentFilter } from './types/student-filter.type';

@Controller('student')
export class StudentController extends BaseController<
  Student,
  StudentFilter,
  CreateStudentDto,
  UpdateStudentDto,
  StudentService
>(CreateStudentDto, UpdateStudentDto, StudentFilter) {
  constructor(service: StudentService) {
    super(service, Student.name);
  }

  @Get()
  async findAll(@Query() filters: StudentFilter, @Res() res: Response) {
    if (filters.export) {
      const data = await this.service.findAll(filters, false);

      const outputFileName = `students_list_${DateTime.now().toFormat(
        'dd-MM-yyyy_HH:mm:ss',
      )}.xlsx`;
      ResponseHelpers.setHeadersForExcelReport(res, outputFileName);

      const excel = await this.service.convertToExcelFile(
        data,
        filters.exportColumns,
      );

      res.send(excel);
      return;
    }

    return await this.service.findAll(filters);
  }
}
