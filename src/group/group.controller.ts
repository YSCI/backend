import {
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
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';
import { GroupFilter } from './types/group-filter.type';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupService.create(createGroupDto);
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
}