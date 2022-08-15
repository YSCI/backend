import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { UpdateHealthStatusDto } from './dto/update-health-status.dto';
import { HealthStatus } from './entities/health-status.entity';
import { HealthStatusService } from './health-status.service';
import { HealthStatusFilter } from './types/health-status-filter.type';

@Controller('health-status')
export class HealthStatusController extends BaseController<
  HealthStatus,
  HealthStatusFilter,
  CreateHealthStatusDto,
  UpdateHealthStatusDto,
  HealthStatusService
>(CreateHealthStatusDto, UpdateHealthStatusDto, HealthStatusFilter) {
  constructor(service: HealthStatusService) {
    super(service, HealthStatus.name);
  }
}
