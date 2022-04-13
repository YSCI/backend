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
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { PrivilegeService } from './privilege.service';
import { PrivilegeFilter } from './types/privilege-filter.type';

@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post()
  async create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    return await this.privilegeService.create(createPrivilegeDto);
  }

  @Get()
  async findAll(@Query() filters: PrivilegeFilter) {
    return await this.privilegeService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const privilege = await this.privilegeService.findOne(id);

    if (!privilege) {
      throw new NotFoundException('Privilege not found');
    }

    return privilege;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updatePrivilegeDto: UpdatePrivilegeDto,
  ): Promise<IOk> {
    const result = await this.privilegeService.update(id, updatePrivilegeDto);

    if (!result) {
      throw new NotFoundException('Privilege not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.privilegeService.remove(ids);

    if (!result) {
      throw new NotFoundException('Privilege not found');
    }

    return { ok: true };
  }
}
