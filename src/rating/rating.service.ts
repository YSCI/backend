import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpsertRatingDto } from './dto/upsert-rating.dto';
import { Rating } from './entities/rating.entity';
import { RatingFilter } from './types/rating-filter.type';

@Injectable()
export class RatingService {
  @InjectRepository(Rating)
  private readonly ratingRepository: Repository<Rating>;

  async findAll(filters: RatingFilter) {
    const where: FindOptionsWhere<Rating> = {};

    if (filters.studentId) where.studentId = filters.studentId;
    if (filters.subjectId) where.subjectId = filters.subjectId;
    if (filters.semester) where.semester = filters.semester;
    if (filters.rate) where.rate = filters.rate;

    const findOpts = attachPagination<Rating>(filters);
    findOpts.where = where;
    findOpts.relations = {
      subject: true,
    };

    const [data, total] = await this.ratingRepository.findAndCount(findOpts);
    return { data, total };
  }

  async findOne(id: number) {
    const [rating] = await this.ratingRepository.find({
      where: { id },
      relations: {
        subject: true,
      },
    });

    return rating;
  }

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

    return insertResult.raw as Array<Rating>;
  }

  async remove(ids: number[]) {
    const result = await this.ratingRepository.delete(ids);

    return !!result.affected;
  }
}
