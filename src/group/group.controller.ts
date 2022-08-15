import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { IOk } from 'src/common/types/ok.type';
import { ProfessionService } from 'src/profession/profesion.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GraduationInfoDto } from './dto/graduation-info.dto';
import { SwitchSemesterDto } from './dto/switch-course.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';
import { GroupFilter } from './types/group-filter.type';

@Controller('group')
export class GroupController extends BaseController<
  Group,
  GroupFilter,
  CreateGroupDto,
  UpdateGroupDto,
  GroupService
>(CreateGroupDto, UpdateGroupDto, GroupFilter) {
  constructor(
    service: GroupService,
    private readonly professionService: ProfessionService,
  ) {
    super(service, Group.name);
  }

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const profession = await this.professionService.findOne(
      createGroupDto.professionId,
    );

    if (!profession) {
      throw new NotFoundException('Depended resource does not exists');
    }

    return await super.create(
      Object.assign(createGroupDto, {
        freePlacesCount: profession.freePlacesCount,
        fee: profession.fee,
      }),
    );
  }

  @Post('switchSemester')
  async switchSemester(
    @Body() { groupIds, isPositive }: SwitchSemesterDto,
  ): Promise<IOk> {
    const groups = await this.service.findByIds(groupIds);
    if (!groups.length) {
      throw new NotFoundException('Group(s) not found');
    } else if (
      !groups.every(
        (group) => group.currentSemester < group.profession.yearsCount * 2,
      )
    ) {
      throw new BadRequestException(
        'One of these groups has already graduated',
      );
    }

    await this.service.switchSemester(groupIds, isPositive);

    return { ok: true };
  }

  @Post('graduate')
  async graduate(@Body() { groupIds }: GraduationInfoDto) {
    const result = await this.service.graduate(groupIds);

    return { ok: result };
  }
}
