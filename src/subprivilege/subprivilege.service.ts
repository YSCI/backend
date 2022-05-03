import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateSubprivilegeDto } from './dto/create-subprivilege.dto';
import { UpdateSubprivilegeDto } from './dto/update-subprivilege.dto';
import { Subprivilege } from './entities/subprivilege.entity';
import { SubprivilegeFilter } from './types/subprivilege-filter.type';

@Injectable()
export class SubprivilegeService {
  @InjectRepository(Subprivilege)
  private readonly privilegeRepository: Repository<Subprivilege>;

  async create(createPrivilegeDto: CreateSubprivilegeDto) {
    return await this.privilegeRepository.save(createPrivilegeDto);
  }

  async findAll(
    filters: SubprivilegeFilter,
  ): Promise<IFindResult<Subprivilege>> {
    const where: FindOptionsWhere<Subprivilege> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.privilegeId) where.privilegeId = filters.privilegeId;

    const findOpts = attachPagination<Subprivilege>(filters);
    findOpts.where = where;

    const [data, total] = await this.privilegeRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    return await this.privilegeRepository.findOneBy({ id });
  }

  async update(id: number, updatePrivilegeDto: UpdateSubprivilegeDto) {
    const result = await this.privilegeRepository.update(
      id,
      updatePrivilegeDto,
    );

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.privilegeRepository.delete(ids);

    return !!result.affected;
  }
}
