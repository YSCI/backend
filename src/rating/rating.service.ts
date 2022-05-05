import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertRatingDto } from './dto/upsert-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  @InjectRepository(Rating)
  private readonly ratingRepository: Repository<Rating>;

  async upsert(upsertRatingDto: Array<UpsertRatingDto>) {
    const insertResult = await this.ratingRepository
      .createQueryBuilder()
      .insert()
      .values(upsertRatingDto)
      .orUpdate(
        ['studentId', 'subjectId', 'semester', 'rate'],
        ['studentId', 'subjectId', 'semester'],
      )
      .returning('*')
      .execute();

    return insertResult.raw as Rating;
  }

  async remove(ids: number[]) {
    const result = await this.ratingRepository.delete(ids);

    return !!result.affected;
  }
}
