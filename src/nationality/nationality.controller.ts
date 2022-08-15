import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { Nationality } from './entities/nationality.entity';
import { NationalityService } from './nationality.service';
import { NationalityFilter } from './types/nationality-filter.type';

@Controller('nationality')
export class NationalityController extends BaseController<
  Nationality,
  NationalityFilter,
  CreateNationalityDto,
  UpdateNationalityDto,
  NationalityService
>(CreateNationalityDto, UpdateNationalityDto, NationalityFilter) {
  constructor(service: NationalityService) {
    super(service, Nationality.name);
  }
}
