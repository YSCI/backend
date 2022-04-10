import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { Subprivilege } from 'src/subprivilege/entities/subprivilege.entity';
import {
  ArrayContains,
  Between,
  FindOptionsWhere,
  ILike,
  In,
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
    const privileges = createStudentDto.subprivileges?.map((item) => {
      const privilege = new Subprivilege();
      privilege.id = item;
      return privilege;
    });

    const student = await this.studentRepository.save(
      Object.assign(createStudentDto, { subprivileges: privileges }),
    );

    return student;
  }

  async findAll(filters: StudentFilter) {
    const where: FindOptionsWhere<Student> = {};

    if (filters.firstname) where.firstname = ILike(filters.firstname + '%');
    if (filters.lastname) where.lastname = ILike(filters.lastname + '%');
    if (filters.fathername) where.fathername = ILike(filters.fathername + '%');
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
    if (filters.professionId) where.professionId = filters.professionId;
    if (filters.healthStatusId) where.healthStatusId = filters.healthStatusId;
    if (filters.statusId) where.statusId = filters.statusId;
    if (filters.commissariatId) where.statusId = filters.commissariatId;
    if (filters.acceptanceCommandNumber)
      where.acceptanceCommandNumber = filters.acceptanceCommandNumber;
    if (filters.currentCourse) where.currentCourse = filters.currentCourse;
    if (filters.currentGroup) where.currentGroup = filters.currentGroup;
    if (filters.dateOfBirthStart && filters.dateOfBirthEnd)
      where.dateOfBirth = Between(
        new Date(filters.dateOfBirthStart),
        new Date(filters.dateOfBirthEnd),
      );
    if (filters.dateOfAcceptanceStart && filters.dateOfAcceptanceEnd)
      where.dateOfAcceptance = Between(
        new Date(filters.dateOfAcceptanceStart),
        new Date(filters.dateOfAcceptanceEnd),
      );
    if (filters.contactNumber)
      where.contactNumbers = ArrayContains([filters.contactNumber]);
    if (filters.subprivileges)
      where.subprivileges = {
        id: In(filters.subprivileges),
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
      profession: true,
      healthStatus: true,
      status: true,
      commissariat: true,
      subprivileges: {
        privilege: true,
      },
    };

    return await this.studentRepository.find(findOpts);
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
        profession: true,
        healthStatus: true,
        status: true,
        commissariat: true,
        subprivileges: {
          privilege: true,
        },
      },
    });

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const result = await this.studentRepository.update(
      id,
      updateStudentDto as any, // temporary
    );

    return !!result.affected;
  }

  async remove(id: number) {
    const result = await this.studentRepository.delete(id);

    return !!result.affected;
  }
}
