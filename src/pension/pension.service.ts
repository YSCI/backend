import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IFindResult } from 'src/common/types/find-result.type';
import { GroupService } from 'src/group/group.service';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';
import { In, Not } from 'typeorm';
// import { StudentPensionDto } from './dto/student-pension-info.dto';
import { RotationFilter } from '../common/types/rotation-filter.type';

@Injectable()
export class PensionService {
  constructor(
    private readonly studentService: StudentService,
    private readonly groupService: GroupService,
  ) {}

  async findAll(
    filters: RotationFilter,
  ): Promise<IFindResult<Partial<Student>>> {
    const { data, total } =
      await this.studentService.getRotatableStudentsWithRatingsAndTotalCount(
        filters,
        true,
      );

    if (!data.length) {
      throw new NotFoundException('Students not found');
    }

    return { data, total };
  }

  async assignPension(studentIds: Array<number>) {
    const result = await this.studentService.update(
      {
        id: In(studentIds),
        hasPension: false,
      },
      { hasPension: true },
    );

    if (!result) {
      throw new BadRequestException(
        'Pension assignment failed. Pension cannot be assigned',
      );
    }

    this.studentService.update(
      {
        id: Not(In(studentIds)),
        hasPension: true,
      },
      { hasPension: false },
    );

    return true;
  }
}
