import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { Privilege } from './entities/privilege.entity';
import { PrivilegeFilter } from './types/privilege-filter.type';

@Injectable()
export class PrivilegeService {
  @InjectRepository(Privilege)
  private readonly privilegeRepository: Repository<Privilege>;

  async create(createPrivilegeDto: CreatePrivilegeDto) {
    return await this.privilegeRepository.save(createPrivilegeDto);
  }

  async findAll(filters: PrivilegeFilter): Promise<IFindResult<Privilege>> {
    const where: FindOptionsWhere<Privilege> = {};

    if (filters.name) where.name = ILike(filters.name + '%');

    const findOpts = attachPagination<Privilege>(filters);
    findOpts.where = where;

    const [data, total] = await this.privilegeRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    const [privilege] = await this.privilegeRepository.find({
      where: { id },
      relations: {
        subprivileges: true,
      },
    });

    return privilege;
  }

  async update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
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
