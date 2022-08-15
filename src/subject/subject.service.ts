import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import {
  ArrayContains,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { SubjectFilter } from './types/subject-filter.type';

@Injectable()
export class SubjectService extends BaseService<
  Subject,
  SubjectFilter,
  CreateSubjectDto,
  UpdateSubjectDto
> {
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filters: SubjectFilter,
  ): FindManyOptions<Subject> {
    const where: FindOptionsWhere<Subject> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.professionId) where.professionId = filters.professionId;
    if (filters.semester) where.semesters = ArrayContains([filters.semester]);
    if (filters.number) where.number = filters.number;

    const findOpts = attachPagination<Subject>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Subject> {
    return {};
  }
}
