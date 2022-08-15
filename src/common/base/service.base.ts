import {
  DeepPartial,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { IFindResult } from '../types/find-result.type';

export abstract class BaseService<
  TEntity extends BaseEntity,
  TFilter,
  TCreateDto extends DeepPartial<TEntity>,
  TUpdateDto extends QueryDeepPartialEntity<TEntity>,
> {
  constructor(protected readonly repository: Repository<TEntity>) {}

  public async create(dto: TCreateDto): Promise<TEntity>;
  public async create(dtos: TCreateDto[]): Promise<TEntity[]>;

  public async create(
    dtoOrDtos: TCreateDto | TCreateDto[],
  ): Promise<TEntity | TEntity[]> {
    return await this.repository.save(dtoOrDtos as any); // Ignoring method overloads
  }

  public async update(id: number, dto: TUpdateDto): Promise<boolean>;
  public async update(
    id: number,
    queryDto: QueryDeepPartialEntity<TEntity>,
  ): Promise<boolean>;
  public async update(ids: number[], dto: TUpdateDto): Promise<boolean>;
  public async update(
    ids: number[],
    queryDto: QueryDeepPartialEntity<TEntity>,
  ): Promise<boolean>;
  public async update(
    criteria: FindOptionsWhere<TEntity>,
    dto: TUpdateDto,
  ): Promise<boolean>;
  public async update(
    criteria: FindOptionsWhere<TEntity>,
    queryDto: QueryDeepPartialEntity<TEntity>,
  ): Promise<boolean>;

  public async update(
    idOrIdsOrCriteria: number | number[] | FindOptionsWhere<TEntity>,
    dto: TUpdateDto | QueryDeepPartialEntity<TEntity>,
  ): Promise<boolean> {
    const result = await this.repository.update(idOrIdsOrCriteria, dto);

    return !!result.affected;
  }

  public async remove(id: number): Promise<boolean>;
  public async remove(ids: number[]): Promise<boolean>;

  public async remove(idOrIds: number | number[]): Promise<boolean> {
    const result = await this.repository.delete(idOrIds);

    return !!result.affected;
  }

  public async removeReturningAll(id: number): Promise<TEntity>;
  public async removeReturningAll(ids: number[]): Promise<TEntity[]>;

  public async removeReturningAll(
    idOrIds: number | number[],
  ): Promise<TEntity | TEntity[]> {
    const options: { isSingleId?: boolean } = {};

    if (!Array.isArray(idOrIds)) {
      idOrIds = [idOrIds];
      options.isSingleId = true;
    }

    const result = await this.repository
      .createQueryBuilder()
      .delete()
      .whereInIds(idOrIds)
      .returning('*')
      .execute();

    return options.isSingleId
      ? (result.raw[0] as TEntity)
      : (result.raw as TEntity[]);
  }

  public async findAll(filter: TFilter): Promise<IFindResult<TEntity>> {
    const filters = this.getFiltersConfiguration(filter);
    filters.relations = this.getRelationsConfiguration();

    const [data, total] = await this.repository.findAndCount(filters);

    return { data, total };
  }

  public async findOne(id: number): Promise<TEntity> {
    const relations = this.getRelationsConfiguration();

    const [result] = await this.repository.find({
      where: { id: id as any }, // fix typeorm 0.3.7 bug
      relations,
    });

    return result;
  }

  protected abstract getFiltersConfiguration(
    filter: TFilter,
  ): FindManyOptions<TEntity>;
  protected abstract getRelationsConfiguration(): FindOptionsRelations<TEntity>;
}
