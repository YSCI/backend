import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
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
    super(service);
  }
}
