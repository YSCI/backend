import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { RegionService } from './region.service';
import { RegionFilter } from './types/region-filter.type';

@Controller('region')
export class RegionController extends BaseController<
  Region,
  RegionFilter,
  CreateRegionDto,
  UpdateRegionDto,
  RegionService
>(CreateRegionDto, UpdateRegionDto, RegionFilter) {
  constructor(service: RegionService) {
    super(service, Region.name);
  }
}
