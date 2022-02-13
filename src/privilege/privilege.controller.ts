import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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

  @Patch(':id')
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

  @Delete(':id')
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.privilegeService.remove(id);

    if (!result) {
      throw new NotFoundException('Privilege not found');
    }

    return { ok: true };
  }
}