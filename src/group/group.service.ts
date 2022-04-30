import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupFilter } from './types/group-filter.type';

@Injectable()
export class GroupService {
  @InjectRepository(Group)
  private readonly groupRepository: Repository<Group>;

  async create(createGroupDto: Omit<CreateGroupDto, 'curriculum'>) {
    return await this.groupRepository.save(createGroupDto);
  }

  async findAll(filters: GroupFilter): Promise<IFindResult<Group>> {
    const where: FindOptionsWhere<Group> = {};

    if (filters.number) where.number = filters.number;
    if (filters.currentSemester)
      where.currentSemester = filters.currentSemester;
    if (filters.auditorium) where.auditorium = filters.auditorium;
    if (filters.professionId) where.professionId = filters.professionId;

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

  async update(id: number, updateGroupDto: Omit<UpdateGroupDto, 'curriculum'>) {
    const result = await this.groupRepository.update(id, updateGroupDto);

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.groupRepository.delete(ids);

    return !!result.affected;
  }
}
