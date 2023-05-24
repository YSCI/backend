import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableColumnProperties, Workbook } from 'exceljs';
import { BaseService } from 'src/common/base/service.base';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { ExcelHelpers } from 'src/common/helpers/excel.helper';
import {
  attachPagination,
  detachPagination,
} from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { RotationFilter } from 'src/common/types/rotation-filter.type';
import {
  ArrayContains,
  Between,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  In,
  Not,
  Repository,
} from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { ExportColumnsDto } from '../common/dto/export-columns.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentFilter } from './types/student-filter.type';

@Injectable()
export class StudentService extends BaseService<
  Student,
  StudentFilter,
  CreateStudentDto,
  UpdateStudentDto
> {
  constructor(@InjectRepository(Student) repository: Repository<Student>) {
    super(repository);
  }

  async getRotatableStudentsWithRatingsAndTotalCount(
    filters: RotationFilter,
  ): Promise<IFindResult<Partial<Student>>> {
    const opts = attachPagination<Student>(filters);
    if (filters.export) detachPagination(opts, { ignoreOrder: true });

    opts.where = {
      currentSemester: Not(-1),
      isFreezed: false,
      rates: {
        semester: In(filters.semestersForCalculation),
      },
      group: {
        profession: {
          id: filters.professionId,
        },
      },
    };
    opts.order.educationStatus = OrderDirection.DESC;
    opts.relations = {
      rates: true,
      group: {
        profession: true,
      },
    };

    const [data, total] = await this.repository.findAndCount(opts);
    return { data, total };
  }

  async switchSemesterByGroupIds(groupIds: number[], isPositive = true) {
    return await this.update(
      {
        groupId: In(groupIds),
        currentSemester: Not(-1),
        isFreezed: false,
      },
      {
        currentSemester: () => `"currentSemester" ${isPositive ? '+' : '-'} 1`,
      },
    );
  }

  async graduateByGroupIds(groupIds: number[]) {
    return await this.update(
      {
        groupId: In(groupIds),
        currentSemester: Not(-1),
        isFreezed: false,
      },
      {
        currentSemester: -1,
        isFreezed: true,
      },
    );
  }

  public convertToExcelFile(
    students: Array<Student>,
    columns: Array<ExportColumnsDto>,
  ) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(Student.name);

    const table = worksheet.addTable({
      name: Student.name,
      ref: 'A1',
      headerRow: true,
      style: {
        theme: 'TableStyleMedium1',
      },
      columns: [
        ...columns.map<TableColumnProperties>((column) => ({
          name: column.name,
        })),
      ],
      rows: ExcelHelpers.parseDeepDataToRows(students, columns),
    });
    table.commit();

    ExcelHelpers.autoFitColumns(worksheet.columns);
    ExcelHelpers.setColumnsAlignment(worksheet.columns, 'center');

    return workbook.xlsx.writeBuffer();
  }

  protected getFiltersConfiguration(
    filters: StudentFilter,
  ): FindManyOptions<Student> {
    const where: FindOptionsWhere<Student> = {};
  
    if (filters.firstname) where.firstname = ILike(filters.firstname + '%');
    if (filters.lastname) where.lastname = ILike(filters.lastname + '%');
    if (filters.fathername) where.fathername = ILike(filters.fathername + '%');
    if (filters.gender) where.gender = filters.gender;
    if (filters.hasPension) where.hasPension = filters.hasPension;
    if (filters.registrationRegionId)
      where.registrationRegionId = filters.registrationRegionId;
    if (filters.registrationCommunityId)
      where.registrationCommunityId = filters.registrationCommunityId;
    if (filters.registrationAddress)
      where.registrationAddress = ILike(
        '%' + filters.registrationAddress + '%',
      );
    if (filters.residentRegionId)
      where.residentRegionId = filters.residentRegionId;
    if (filters.residentCommunityId)
      where.residentCommunityId = filters.residentCommunityId;
    if (filters.residentAddress)
      where.residentAddress = ILike('%' + filters.residentAddress + '%');
    if (filters.passportSeries)
      where.passportSeries = ILike(filters.passportSeries + '%');
    if (filters.passportType) {
      where.passportType = filters.passportType;
    }
    if (filters.passportIssuedBy) {
      where.passportIssuedBy = filters.passportIssuedBy;
    }
    if (filters.socialCardNumber)
      where.socialCardNumber = filters.socialCardNumber;
    if (filters.educationBasis) {
      where.educationBasis = filters.educationBasis;
    }
    if (filters.citizenshipId) where.citizenshipId = filters.citizenshipId;
    if (filters.nationalityId) where.nationalityId = filters.nationalityId;
    if (filters.professionId)
      where.group = { professionId: filters.professionId };
    if (filters.healthStatusId) where.healthStatusId = filters.healthStatusId;
    if (filters.statusId) where.statusId = filters.statusId;
    if (filters.educationStatus) where.educationStatus = filters.statusId;
    if (filters.commissariatId) where.statusId = filters.commissariatId;
    if (filters.acceptanceCommandNumber)
      where.acceptanceCommandNumber = filters.acceptanceCommandNumber;
    if (filters.groupId) where.groupId = filters.groupId;
    if (filters.semester) where.currentSemester = filters.semester;
    if (filters.dateOfBirthStart && filters.dateOfBirthEnd)
      where.dateOfBirth = Between(
        filters.dateOfBirthStart,
        filters.dateOfBirthEnd,
      );
    if (filters.dateOfAcceptanceStart && filters.dateOfAcceptanceEnd)
      where.dateOfAcceptance = Between(
        filters.dateOfAcceptanceStart,
        filters.dateOfAcceptanceEnd,
      );
    if (filters.contactNumber)
      where.contactNumbers = ArrayContains([filters.contactNumber]);
    if (filters.privileges) where.privilegeId = In(filters.privileges);
    if (filters.privilegeExpirationDate)
      where.privilegeExpirationDate = filters.privilegeExpirationDate;
    if (filters.commandId)
      where.attachedCommands = {
        commandId: filters.commandId,
        affectDate: Between(filters.commandStartDate, filters.commandEndDate),
      };
    if (filters.passportValidUntilStart && filters.passportValidUntilEnd) {
      where.passportValidUntil = Between(
        filters.passportValidUntilStart,
        filters.passportDateOfIssueEnd,
      );
    }
    if (filters.passportDateOfIssueStart && filters.passportDateOfIssueEnd) {
      where.passportDateOfIssue = Between(
        filters.passportDateOfIssueStart,
        filters.passportDateOfIssueEnd,
      );
    }

    const findOpts = attachPagination<Student>(filters);
    findOpts.where = where;

    if (filters.export) detachPagination(findOpts, { ignoreOrder: true });

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Student> {
    return {
      citizenship: true,
      registrationRegion: true,
      registrationCommunity: true,
      residentCommunity: true,
      residentRegion: true,
      nationality: true,
      healthStatus: true,
      status: true,
      commissariat: true,
      group: {
        profession: true,
      },
      privilege: true,
    };
  }
}
