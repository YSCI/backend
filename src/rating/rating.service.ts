import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { UpsertRatingDto } from './dto/upsert-rating.dto';
import { Rating } from './entities/rating.entity';
import { RatingFilter } from './types/rating-filter.type';

@Injectable()
export class RatingService extends BaseService<
  Rating,
  RatingFilter,
  never,
  never
> {
  constructor(@InjectRepository(Rating) repository: Repository<Rating>) {
    super(repository);
  }

  async upsert(upsertRatingDtos: Array<UpsertRatingDto>) {
    const insertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .into(
        Rating,
        this.repository.metadata.ownColumns.map(
          (column) => column.propertyName,
        ),
      )
      .values(upsertRatingDtos)
      .orUpdate(['studentId', 'subjectId', 'semester', 'rate'], ['id'])
      .returning('*')
      .execute();

    return insertResult.raw as Array<Rating>;
  }

  protected getFiltersConfiguration(
    filters: RatingFilter,
  ): FindManyOptions<Rating> {
    const where: FindOptionsWhere<Rating> = {};

    if (filters.studentId) where.studentId = filters.studentId;
    if (filters.subjectId) where.subjectId = filters.subjectId;
    if (filters.semester) where.semester = filters.semester;
    if (filters.rate) where.rate = filters.rate;

    const findOpts = attachPagination<Rating>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Rating> {
    return {
      subject: true,
    };
  }
}

delete RatingService.prototype.create;
delete RatingService.prototype.update;
