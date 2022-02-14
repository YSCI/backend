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
import { CommissariatService } from './commissariat.service';
import { CreateCommissariatDto } from './dto/create-commissariat.dto';
import { UpdateCommissariatDto } from './dto/update-commissariat.dto';
import { CommissariatFilter } from './types/commissariat-filter.type';

@Controller('commissariat')
export class CommissariatController {
  constructor(private readonly commissariatService: CommissariatService) {}

  @Post()
  async create(@Body() createCommissariatDto: CreateCommissariatDto) {
    return await this.commissariatService.create(createCommissariatDto);
  }

  @Get()
  async findAll(@Query() filters: CommissariatFilter) {
    return await this.commissariatService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const commissariat = await this.commissariatService.findOne(id);

    if (!commissariat) {
      throw new NotFoundException('Commissariat not found');
    }

    return commissariat;
  }

  @Patch(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateCommissariatDto: UpdateCommissariatDto,
  ): Promise<IOk> {
    const result = await this.commissariatService.update(
      id,
      updateCommissariatDto,
    );

    if (!result) {
      throw new NotFoundException('Commissariat not found');
    }

    return { ok: true };
  }

  @Delete(':id')
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.commissariatService.remove(id);

    if (!result) {
      throw new NotFoundException('Commissariat not found');
    }

    return { ok: true };
  }
}
