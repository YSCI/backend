import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CommissariatService } from './commissariat.service';
import { CreateCommissariatDto } from './dto/create-commissariat.dto';
import { UpdateCommissariatDto } from './dto/update-commissariat.dto';
import { Commissariat } from './entities/commissariat.entity';
import { CommissariatFilter } from './types/commissariat-filter.type';

@Controller('commissariat')
export class CommissariatController extends BaseController<
  Commissariat,
  CommissariatFilter,
  CreateCommissariatDto,
  UpdateCommissariatDto,
  CommissariatService
> {
  constructor(service: CommissariatService) {
    super(service, Commissariat.name);
  }
}
