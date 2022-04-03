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
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CreateSubprivilegeDto } from './dto/create-subprivilege.dto';
import { UpdateSubprivilegeDto } from './dto/update-subprivilege.dto';
import { SubprivilegeService } from './subprivilege.service';
import { SubprivilegeFilter } from './types/subprivilege-filter.type';

@Controller('subprivilege')
export class SubprivilegeController {
  constructor(private readonly subprivilegeService: SubprivilegeService) {}

  @Post()
  async create(@Body() createSubprivilegeDto: CreateSubprivilegeDto) {
    return await this.subprivilegeService.create(createSubprivilegeDto);
  }

  @Get()
  async findAll(@Query() filters: SubprivilegeFilter) {
    return await this.subprivilegeService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const privilege = await this.subprivilegeService.findOne(id);

    if (!privilege) {
      throw new NotFoundException('Subprivilege not found');
    }

    return privilege;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateSubprivilegeDto: UpdateSubprivilegeDto,
  ): Promise<IOk> {
    const result = await this.subprivilegeService.update(
      id,
      updateSubprivilegeDto,
    );

    if (!result) {
      throw new NotFoundException('Subprivilege not found');
    }

    return { ok: true };
  }

  @Delete(':id')
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.subprivilegeService.remove(id);

    if (!result) {
      throw new NotFoundException('Subprivilege not found');
    }

    return { ok: true };
  }
}
