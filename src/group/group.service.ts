import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { StudentService } from 'src/student/student.service';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Not,
  Repository,
} from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupFilter } from './types/group-filter.type';

@Injectable()
export class GroupService extends BaseService<
  Group,
  GroupFilter,
  CreateGroupDto,
  UpdateGroupDto
> {
  constructor(
    @InjectRepository(Group) repository: Repository<Group>,
    private readonly studentService: StudentService,
  ) {
    super(repository);
  }

  async findByIds(ids: Array<number>, curriculum = false) {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
      relations: {
        profession: true,
        curriculum,
      },
    });
  }

  async switchSemester(groupIds: number[], isPositive = true) {
    const result = await this.update(
      {
        id: In(groupIds),
        currentSemester: Not(-1),
      },
      {
        currentSemester: () => `"currentSemester" ${isPositive ? '+' : '-'} 1`,
      },
    );

    if (result) {
      await this.studentService.switchSemesterByGroupIds(groupIds, isPositive);
    }

    return result;
  }

  async graduate(groupIds: number[]) {
    const result = await this.update(
      {
        id: In(groupIds),
        currentSemester: Not(-1),
      },
      {
        currentSemester: -1,
      },
    );

    if (result) {
      await this.studentService.graduateByGroupIds(groupIds);
    }

    return true;
  }

  protected getFiltersConfiguration(
    filters: GroupFilter,
  ): FindManyOptions<Group> {
    const where: FindOptionsWhere<Group> = {};

    if (filters.number) where.number = filters.number;
    if (filters.currentSemester)
      where.currentSemester = filters.currentSemester;
    if (filters.auditorium) where.auditorium = filters.auditorium;
    if (filters.professionId) where.professionId = filters.professionId;
    if (filters.openedAt) where.openedAt = filters.openedAt;
    if (filters.freePlacesCount)
      where.freePlacesCount = filters.freePlacesCount;
    if (filters.fee) where.fee = filters.fee;

    const findOpts = attachPagination<Group>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Group> {
    return {
      curriculum: true,
      profession: true,
    };
  }
}
