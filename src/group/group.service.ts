import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { UpdateDto } from 'src/common/types/update-dto.type';
import { StudentService } from 'src/student/student.service';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupFilter } from './types/group-filter.type';

@Injectable()
export class GroupService {
  @InjectRepository(Group)
  private readonly groupRepository: Repository<Group>;

  constructor(private readonly studentService: StudentService) {}

  async create(createGroupDto: CreateGroupDto) {
    return await this.groupRepository.save(createGroupDto);
  }

  async findAll(filters: GroupFilter): Promise<IFindResult<Group>> {
    const where: FindOptionsWhere<Group> = {};

    if (filters.number) where.number = filters.number;
    if (filters.currentSemester)
      where.currentSemester = filters.currentSemester;
    if (filters.auditorium) where.auditorium = filters.auditorium;
    if (filters.professionId) where.professionId = filters.professionId;
    if (filters.openedAt) where.openedAt = filters.openedAt;

    const findOpts = attachPagination<Group>(filters);
    findOpts.where = where;
    findOpts.relations = {
      curriculum: true,
      profession: true,
    };

    const [data, total] = await this.groupRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    const [group] = await this.groupRepository.find({
      where: { id },
      relations: {
        curriculum: true,
        profession: true,
      },
    });

    return group;
  }

  async findByIds(ids: Array<number>, curriculum = false) {
    return await this.groupRepository.find({
      where: {
        id: In(ids),
      },
      relations: {
        profession: true,
        curriculum,
      },
    });
  }

  async update(
    criteria: number | number[] | FindOptionsWhere<Group>,
    updateGroupDto: UpdateDto<UpdateGroupDto>,
  ) {
    const result = await this.groupRepository.update(criteria, updateGroupDto);

    return !!result.affected;
  }

  async switchSemester(idOrIds: number | number[], isPositive = true) {
    const result = await this.update(idOrIds, {
      currentSemester: () => `"currentSemester" ${isPositive ? '+' : '-'} 1`,
    });

    if (result) {
      await this.studentService.switchSemester(
        {
          groupId: Array.isArray(idOrIds) ? In(idOrIds) : idOrIds,
          isFreezed: false,
        },
        isPositive,
      );
    }

    return result;
  }

  async graduate(groupIdOrIds: number | number[]) {
    const result = await this.update(
      {
        id: Array.isArray(groupIdOrIds) ? In(groupIdOrIds) : groupIdOrIds,
        currentSemester: Not(-1),
      },
      {
        currentSemester: -1,
      },
    );

    if (result) {
      await this.studentService.graduate({
        groupId: Array.isArray(groupIdOrIds) ? In(groupIdOrIds) : groupIdOrIds,
        currentSemester: Not(-1),
        isFreezed: false,
      });
    }

    return true;
  }

  async remove(ids: number[]) {
    const result = await this.groupRepository.delete(ids);

    return !!result.affected;
  }
}
