import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { StatusService } from './status.service';
import { StatusFilter } from './types/status-filter.type';

@Controller('status')
export class StatusController extends BaseController<
  Status,
  StatusFilter,
  CreateStatusDto,
  UpdateStatusDto,
  StatusService
>(CreateStatusDto, UpdateStatusDto, StatusFilter) {
  constructor(service: StatusService) {
    super(service, Status.name);
  }
}
