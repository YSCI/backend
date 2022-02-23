import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { Privilege } from 'src/privilege/entities/privilege.entity';
import { FindCondition, ILike, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentFilter } from './types/student-filter.type';

@Injectable()
export class StudentService {
  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>;

  async create(createStudentDto: CreateStudentDto) {
    const privileges = createStudentDto.privileges.map((item) => {
      const privilege = new Privilege();
      privilege.id = item;
      return privilege;
    });

    const student = await this.studentRepository.save(
      Object.assign(createStudentDto, { privileges }),
    );

    return student;
  }

  async findAll(filters: StudentFilter) {
    const where: FindCondition<Student> = {};

    // TODO: Add filters for dateOfBirth, dateOfAcceptance and contactNumbers and privileges
    if (filters.firstname) where.firstname = ILike(filters.firstname + '%');
    if (filters.lastname) where.lastname = ILike(filters.lastname + '%');
    if (filters.fathername) where.fathername = ILike(filters.fathername + '%');
    if (filters.registrationAddress)
      where.registrationAddress = ILike(filters.registrationAddress + '%');
    if (filters.residentAddress)
      where.residentAddress = ILike(filters.residentAddress + '%');
    if (filters.fathername) where.fathername = ILike(filters.fathername + '%');
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

    const findOpts = attachPagination<Student>(filters);
    findOpts.where = where;
    findOpts.relations = [
      'citizenship',
      'nationality',
      'profession',
      'healthStatus',
      'status',
      'commissariat',
      'privileges',
    ];

    return await this.studentRepository.find(findOpts);
  }

  async findOne(id: number) {
    return await this.studentRepository.findOne(id, {
      relations: [
        'citizenship',
        'nationality',
        'profession',
        'healthStatus',
        'status',
        'commissariat',
        'privileges',
      ],
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const privileges = updateStudentDto.privileges.map((item) => {
      const privilege = new Privilege();
      privilege.id = item;
      return privilege;
    });

    const result = await this.studentRepository.update(
      id,
      Object.assign(updateStudentDto, { privileges }),
    );

    return !!result.affected;
  }

  async remove(id: number) {
    const result = await this.studentRepository.delete(id);

    return !!result.affected;
  }
}
