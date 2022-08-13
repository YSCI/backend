import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CitizenshipService } from './citizenship.service';
import { CreateCitizenshipDto } from './dto/create-citizenship.dto';
import { UpdateCitizenshipDto } from './dto/update-citizenship.dto';
import { Citizenship } from './entities/citizenship.entity';
import { CitizenshipFilter } from './types/citizenship-filter.type';

@Controller('citizenship')
export class CitizenshipController extends BaseController<
  Citizenship,
  CitizenshipFilter,
  CreateCitizenshipDto,
  UpdateCitizenshipDto,
  CitizenshipService
> {
  constructor(service: CitizenshipService) {
    super(service, Citizenship.name);
  }
}
