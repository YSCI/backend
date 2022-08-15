import {
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Type,
  UsePipes,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { ValidationPipeOptions } from '../options/validation-pipe.options';
import { BatchDelete } from '../types/batch-delete.type';
import { GenericValidationPipe } from '../types/generic-validation-pipe.type';
import { IOk } from '../types/ok.type';
import { PathParams } from '../types/path-params.type';
import { BaseService } from './service.base';

export function BaseController<
  TEntity extends BaseEntity,
  TFilter,
  TCreateDto extends DeepPartial<TEntity>,
  TUpdateDto extends QueryDeepPartialEntity<TEntity>,
  TService extends BaseService<TEntity, TFilter, TCreateDto, TUpdateDto>,
>(
  createDto: Type<TCreateDto>,
  updateDto: Type<TUpdateDto>,
  filter: Type<TFilter>,
) {
  class LocalBaseController {
    constructor(
      protected readonly service: TService,
      protected readonly resourceName: string = 'Data',
    ) {}

    @Post()
    @UsePipes(
      new GenericValidationPipe(ValidationPipeOptions, { body: createDto }),
    )
    async create(@Body() dto: TCreateDto) {
      return await this.service.create(dto);
    }

    @Get()
    @UsePipes(
      new GenericValidationPipe(ValidationPipeOptions, { query: filter }),
    )
    async findAll(@Query() filters: TFilter) {
      return await this.service.findAll(filters);
    }

    @Get(':id')
    async findOne(@Param() { id }: PathParams) {
      const result = await this.service.findOne(id);

      if (!result) {
        throw new NotFoundException(`${this.resourceName} not found`);
      }

      return result;
    }

    @Put(':id')
    @UsePipes(
      new GenericValidationPipe(ValidationPipeOptions, { body: updateDto }),
    )
    async update(
      @Param() { id }: PathParams,
      @Body() dto: TUpdateDto,
    ): Promise<IOk> {
      const result = await this.service.update(id, dto);

      if (!result) {
        throw new NotFoundException(`${this.resourceName} not found`);
      }

      return { ok: true };
    }

    @Delete()
    async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
      const result = await this.service.remove(ids);

      if (!result) {
        throw new NotFoundException(`${this.resourceName} not found`);
      }

      return { ok: true };
    }
  }

  return LocalBaseController;
}
