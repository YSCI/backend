import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { SubjectFilter } from './types/subject-filter.type';

@Controller('subject')
export class SubjectController extends BaseController<
  Subject,
  SubjectFilter,
  CreateSubjectDto,
  UpdateSubjectDto,
  SubjectService
>(CreateSubjectDto, UpdateSubjectDto, SubjectFilter) {
  constructor(service: SubjectService) {
    super(service);
  }
}
