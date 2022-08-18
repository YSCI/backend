import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EducationStatus } from 'src/common/enums/education-status.enum';
import { IFindResult } from 'src/common/types/find-result.type';
import { GroupService } from 'src/group/group.service';
import { StudentService } from 'src/student/student.service';
import { In, Not } from 'typeorm';
import { RotationAdditionalData } from './dto/rotation-additional-data.dto';
import { RotationFilter } from '../common/types/rotation-filter.type';
import { StudentRotationInfo } from './types/student-rotation-info.type';
import { generateReport } from 'src/common/templates/report-template';
import { SubjectService } from 'src/subject/subject.service';
import { DateHelpers } from 'src/common/helpers/date.helper';
import { ReportType } from 'src/common/types/report.type';

@Injectable()
export class RotationService {
  constructor(
    private readonly studentService: StudentService,
    private readonly groupService: GroupService,
    private readonly subjectService: SubjectService,
  ) {}

  async findAllAndCalculateRatesSum(
    filters: RotationFilter,
  ): Promise<
    IFindResult<StudentRotationInfo, RotationAdditionalData> | ArrayBuffer
  > {
    const { data: students, total } =
      await this.studentService.getRotatableStudentsWithRatingsAndTotalCount(
        filters,
      );

    if (!students.length) {
      throw new NotFoundException('Students not found');
    }

    const mappedStudents = students.map<StudentRotationInfo>((student) => {
      let total = 0;
      const semesters = student.rates?.reduce((acc, curr) => {
        if (!acc[curr.semester]) acc[curr.semester] = 0;

        acc[curr.semester] += curr.rate;
        total += curr.rate;
        return acc;
      }, {} as { [x: number]: number });

      return {
        id: student.id,
        firstname: student.firstname,
        lastname: student.lastname,
        educationStatus: student.educationStatus,
        ...{ rates: filters.export ? student.rates : undefined },
        ratesSum: {
          semesters,
          total,
        },
      };
    });

    mappedStudents.sort((left, right) =>
      left.educationStatus === right.educationStatus
        ? right.ratesSum.total - left.ratesSum.total
        : 1,
    );

    if (filters.export) {
      const subjects = await this.subjectService.findAll({
        professionId: filters.professionId,
        semesters: filters.semestersForCalculation,
        limit: 0,
      });
      const professionCode = students[0].group.profession.code;
      const academicYears = DateHelpers.getCurrentAcademicYear();

      return await generateReport(
        students,
        subjects.data,
        professionCode,
        academicYears,
        filters.semestersForCalculation,
        ReportType.Rotation,
      );
    } else {
      const { freePlacesCount } = await this.groupService.findOne(
        students[0].groupId,
      );
      return { data: mappedStudents, additional: { freePlacesCount }, total };
    }
  }

  async rotate(studentIds: Array<number>) {
    const result = await this.studentService.update(
      {
        id: In(studentIds),
        educationStatus: EducationStatus.RotationPaid,
      },
      { educationStatus: EducationStatus.RotationFree },
    );

    if (!result) {
      throw new BadRequestException(
        'Rotation failed. Students can not be rotated',
      );
    }

    this.studentService.update(
      {
        id: Not(In(studentIds)),
        educationStatus: EducationStatus.RotationFree,
      },
      { educationStatus: EducationStatus.RotationPaid },
    );

    return true;
  }
}
