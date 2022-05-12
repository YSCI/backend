import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertRatingDto } from './dto/upsert-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  @InjectRepository(Rating)
  private readonly ratingRepository: Repository<Rating>;

  async upsert(upsertRatingDtos: Array<UpsertRatingDto>) {
    const insertResult = await this.ratingRepository
      .createQueryBuilder()
      .insert()
      .into(
        Rating,
        this.ratingRepository.metadata.ownColumns.map(
          (column) => column.propertyName,
        ),
      )
      .values(upsertRatingDtos)
      .orUpdate(['studentId', 'subjectId', 'semester', 'rate'], ['id'])
      .returning('*')
      .execute();

    return insertResult.raw as Rating;
  }

  async remove(ids: number[]) {
    const result = await this.ratingRepository.delete(ids);

    return !!result.affected;
  }
}
