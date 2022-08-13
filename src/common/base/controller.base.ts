import {
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { BatchDelete } from '../types/batch-delete.type';
import { IOk } from '../types/ok.type';
import { PathParams } from '../types/path-params.type';
import { BaseService } from './service.base';

export class BaseController<
  TEntity extends BaseEntity,
  TFilter,
  TCreateDto extends DeepPartial<TEntity>,
  TUpdateDto extends QueryDeepPartialEntity<TEntity>,
  TService extends BaseService<TEntity, TFilter, TCreateDto, TUpdateDto>,
> {
  constructor(protected readonly service: TService) {}

  @Post()
  async create(@Body() dto: TCreateDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll(@Query() filters: TFilter) {
    return await this.service.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const result = await this.service.findOne(id);

    if (!result) {
      throw new NotFoundException('Data not found');
    }

    return result;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() dto: TUpdateDto,
  ): Promise<IOk> {
    const result = await this.service.update(id, dto);

    if (!result) {
      throw new NotFoundException('Data not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.service.remove(ids);

    if (!result) {
      throw new NotFoundException('Data not found');
    }

    return { ok: true };
  }
}
