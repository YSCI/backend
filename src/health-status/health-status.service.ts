import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { UpdateHealthStatusDto } from './dto/update-health-status.dto';
import { HealthStatus } from './entities/health-status.entity';
import { HealthStatusFilter } from './types/health-status-filter.type';

@Injectable()
export class HealthStatusService {
  @InjectRepository(HealthStatus)
  private readonly healthStatusRepository: Repository<HealthStatus>;

  async create(createHealthStatusDto: CreateHealthStatusDto) {
    return await this.healthStatusRepository.save(createHealthStatusDto);
  }

  async findAll(
    filters: HealthStatusFilter,
  ): Promise<IFindResult<HealthStatus>> {
    const where: FindOptionsWhere<HealthStatus> = {};

    if (filters.status) where.status = ILike(filters.status + '%');

    const findOpts = attachPagination<HealthStatus>(filters);
    findOpts.where = where;

    const [data, total] = await this.healthStatusRepository.findAndCount(
      findOpts,
    );
    return { data, total };
  }

  async findOne(id: number) {
    return await this.healthStatusRepository.findOneBy({ id });
  }

  async update(id: number, updateHealthStatusDto: UpdateHealthStatusDto) {
    const result = await this.healthStatusRepository.update(
      id,
      updateHealthStatusDto,
    );

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.healthStatusRepository.delete(ids);

    return !!result.affected;
  }
}
