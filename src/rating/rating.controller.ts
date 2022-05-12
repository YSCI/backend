import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { RatingService } from 'src/rating/rating.service';
import { UpsertRatingDto } from './dto/upsert-rating.dto';
import { RatingFilter } from './types/rating-filter.type';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async upsert(
    @Body(new ParseArrayPipe({ items: UpsertRatingDto }))
    upsertRatingDtos: Array<UpsertRatingDto>,
  ) {
    return await this.ratingService.upsert(upsertRatingDtos);
  }

  @Get()
  async findAll(@Query() filters: RatingFilter) {
    return await this.ratingService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    return await this.ratingService.findOne(id);
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete): Promise<IOk> {
    const result = await this.ratingService.remove(ids);

    if (!result) {
      throw new NotFoundException('Rating not found');
    }

    return { ok: true };
  }
}
