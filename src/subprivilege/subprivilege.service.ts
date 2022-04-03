import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
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

  async findAll(filters: SubprivilegeFilter) {
    const where: FindOptionsWhere<Subprivilege> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.privilegeId) where.privilegeId = filters.privilegeId;

    const findOpts = attachPagination<Subprivilege>(filters);
    findOpts.where = where;

    return await this.privilegeRepository.find(findOpts);
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

  async remove(id: number) {
    const result = await this.privilegeRepository.delete(id);

    return !!result.affected;
  }
}
