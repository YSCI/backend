import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { Profession } from './entities/profession.entity';
import { ProfessionService } from './profesion.service';
import { ProfessionsFilter } from './types/profession-filter.type';

@Controller('profession')
export class ProfessionController extends BaseController<
  Profession,
  ProfessionsFilter,
  CreateProfessionDto,
  UpdateProfessionDto,
  ProfessionService
>(CreateProfessionDto, UpdateProfessionDto, ProfessionsFilter) {
  constructor(service: ProfessionService) {
    super(service, Profession.name);
  }
}
