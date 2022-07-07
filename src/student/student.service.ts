import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { RotationFilter } from 'src/common/types/rotation-filter.type';
import { UpdateDto } from 'src/common/types/update-dto.type';
import {
  ArrayContains,
  Between,
  FindOptionsWhere,
  ILike,
  In,
  Not,
  Repository,
} from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentFilter } from './types/student-filter.type';

@Injectable()
export class StudentService {
  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>;

  async create(createStudentDto: CreateStudentDto) {
    return await this.studentRepository.save(createStudentDto);
  }

  async findAll(
    filters: Partial<StudentFilter>,
  ): Promise<IFindResult<Student>> {
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
    if (filters.socialCardNumber)
      where.socialCardNumber = filters.socialCardNumber;
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
    if (filters.subprivileges)
      where.subprivileges = {
        id: In(filters.subprivileges),
      };
    if (filters.commandId)
      where.attachedCommands = {
        commandId: filters.commandId,
        affectDate: Between(filters.commandStartDate, filters.commandEndDate),
      };

    const findOpts = attachPagination<Student>(filters);

    findOpts.where = where;
    findOpts.relations = {
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
      subprivileges: {
        privilege: true,
      },
    };

    const [data, total] = await this.studentRepository.findAndCount(findOpts);

    return { data, total };
  }

  async getRotatableStudentsWithRatingsAndTotalCount(
    filters: RotationFilter,
    withSubjects = false,
  ): Promise<IFindResult<Partial<Student>>> {
    const opts = attachPagination<Student>(filters);

    opts.select = {
      id: true,
      firstname: true,
      lastname: true,
      fathername: true,
      groupId: true,
      educationStatus: true,
      rates: {
        id: true,
        rate: true,
        semester: true,
        subject: {
          id: true,
          name: true,
        },
      },
    };
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
      rates: withSubjects ? { subject: true } : true,
    };

    const [data, total] = await this.studentRepository.findAndCount(opts);
    return { data, total };
  }

  async findOne(id: number) {
    const [student] = await this.studentRepository.find({
      where: { id },
      relations: {
        citizenship: true,
        registrationRegion: true,
        registrationCommunity: true,
        residentCommunity: true,
        residentRegion: true,
        nationality: true,
        healthStatus: true,
        status: true,
        commissariat: true,
        group: true,
        subprivileges: {
          privilege: true,
        },
      },
    });

    return student;
  }

  async update(
    criteria: number | number[] | FindOptionsWhere<Student>,
    updateStudentDto: UpdateDto<
      UpdateStudentDto | { isFreezed?: boolean; hasPension?: boolean }
    >,
  ) {
    const result = await this.studentRepository.update(
      criteria,
      updateStudentDto,
    );

    return !!result.affected;
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

  async remove(ids: number[]) {
    const result = await this.studentRepository.delete(ids);

    return !!result.affected;
  }
}
