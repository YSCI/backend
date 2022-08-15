import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { Privilege } from './entities/privilege.entity';
import { PrivilegeService } from './privilege.service';
import { PrivilegeFilter } from './types/privilege-filter.type';

@Controller('privilege')
export class PrivilegeController extends BaseController<
  Privilege,
  PrivilegeFilter,
  CreatePrivilegeDto,
  UpdatePrivilegeDto,
  PrivilegeService
>(CreatePrivilegeDto, UpdatePrivilegeDto, PrivilegeFilter) {
  constructor(service: PrivilegeService) {
    super(service, Privilege.name);
  }
}
