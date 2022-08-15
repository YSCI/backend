import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { RatingService } from 'src/rating/rating.service';
import { UpsertRatingDto } from './dto/upsert-rating.dto';
import { Rating } from './entities/rating.entity';
import { RatingFilter } from './types/rating-filter.type';

@Controller('rating')
export class RatingController extends BaseController<
  Rating,
  RatingFilter,
  never,
  never,
  RatingService
>(null, null, RatingFilter) {
  constructor(service: RatingService) {
    super(service, Rating.name);
  }

  @Post()
  async upsert(
    @Body(new ParseArrayPipe({ items: UpsertRatingDto }))
    upsertRatingDtos: Array<UpsertRatingDto>,
  ) {
    return await this.service.upsert(upsertRatingDtos);
  }
}

delete RatingController.prototype.create;
delete RatingController.prototype.update;
