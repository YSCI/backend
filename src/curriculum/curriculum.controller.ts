import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CurriculumService } from 'src/curriculum/curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  async create(
    @Body(new ParseArrayPipe({ items: CreateCurriculumDto }))
    createCurriculumDtos: Array<CreateCurriculumDto>,
  ) {
    return await this.curriculumService.create(createCurriculumDtos);
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
  ): Promise<IOk> {
    const result = await this.curriculumService.update(id, updateCurriculumDto);

    if (!result) {
      throw new NotFoundException('Curriculum not found');
    }

    return { ok: true };
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.curriculumService.remove(ids);

    if (!result) {
      throw new NotFoundException('Curriculum not found');
    }

    return { ok: true };
  }
}
