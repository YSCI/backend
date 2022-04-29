import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { ArrayContains, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { SubjectFilter } from './types/subject-filter.type';

@Injectable()
export class SubjectService {
  @InjectRepository(Subject)
  private readonly subjectRepository: Repository<Subject>;

  async create(createSubjectDto: CreateSubjectDto) {
    return await this.subjectRepository.save(createSubjectDto);
  }

  async findAll(filters: SubjectFilter): Promise<IFindResult<Subject>> {
    const where: FindOptionsWhere<Subject> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.professionId) where.professionId = filters.professionId;
    if (filters.semester) where.semesters = ArrayContains([filters.semester]);

    const findOpts = attachPagination<Subject>(filters);
    findOpts.where = where;
    findOpts.relations = {
      profession: true,
    };

    const [data, total] = await this.subjectRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    const [subject] = await this.subjectRepository.find({
      where: { id },
      relations: { profession: true },
    });

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const result = await this.subjectRepository.update(id, updateSubjectDto);

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.subjectRepository.delete(ids);

    return !!result.affected;
  }
}
