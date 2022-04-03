import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
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

  async findAll(filters: HealthStatusFilter) {
    const where: FindOptionsWhere<HealthStatus> = {};

    if (filters.status) where.status = ILike(filters.status + '%');

    const findOpts = attachPagination<HealthStatus>(filters);
    findOpts.where = where;

    return await this.healthStatusRepository.find(findOpts);
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

  async remove(id: number) {
    const result = await this.healthStatusRepository.delete(id);

    return !!result.affected;
  }
}
