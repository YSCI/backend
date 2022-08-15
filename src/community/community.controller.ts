import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';
import { CommunityFilter } from './types/community-filter.type';

@Controller('community')
export class CommunityController extends BaseController<
  Community,
  CommunityFilter,
  CreateCommunityDto,
  UpdateCommunityDto,
  CommunityService
>(CreateCommunityDto, UpdateCommunityDto, CommunityFilter) {
  constructor(service: CommunityService) {
    super(service, Community.name);
  }
}
