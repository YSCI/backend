import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { ProfessionService } from 'src/profession/profesion.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GraduationInfoDto } from './dto/graduation-info.dto';
import { SwitchSemesterDto } from './dto/switch-course.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';
import { GroupFilter } from './types/group-filter.type';

@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly professionService: ProfessionService,
  ) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const profession = await this.professionService.findOne(
      createGroupDto.professionId,
    );

    if (!profession) {
      throw new NotFoundException('Depended resource does not exists');
    }

    return await this.groupService.create(createGroupDto, {
      freePlacesCount: profession.freePlacesCount,
      fee: profession.fee,
    });
  }

  @Get()
  async findAll(@Query() filters: GroupFilter) {
    return await this.groupService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const group = await this.groupService.findOne(id);

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<IOk> {
    const result = await this.groupService.update(id, updateGroupDto);

    if (!result) {
      throw new NotFoundException('Group not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.groupService.remove(ids);

    if (!result) {
      throw new NotFoundException('Group not found');
    }

    return { ok: true };
  }

  @Post('switchSemester')
  async switchSemester(@Body() { groupIds, isPositive }: SwitchSemesterDto) {
    const groups = await this.groupService.findByIds(groupIds);

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

    await this.groupService.switchSemester(groupIds, isPositive);

    return { ok: true };
  }

  @Post('graduate')
  async graduate(@Body() { groupIds }: GraduationInfoDto) {
    const result = await this.groupService.graduate(groupIds);

    return result;
  }
}
