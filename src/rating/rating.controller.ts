import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { IOk } from 'src/common/types/ok.type';
import { RatingService } from 'src/rating/rating.service';
import { UpsertRatingDto } from './dto/upsert-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(
    @Body(new ParseArrayPipe({ items: UpsertRatingDto }))
    upsertRatingDtos: Array<UpsertRatingDto>,
  ) {
    return await this.ratingService.upsert(upsertRatingDtos);
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
