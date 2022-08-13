import {
  DeepPartial,
  FindManyOptions,
  FindOptionsRelations,
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
  constructor(protected readonly repository: Repository<TEntity>) {
    this.repository = repository;
  }

  public async create(dto: TCreateDto): Promise<TEntity>;
  public async create(dtos: TCreateDto[]): Promise<TEntity>;

  public async create(dtoOrDtos: TCreateDto | TCreateDto[]): Promise<TEntity> {
    return await this.repository.save(dtoOrDtos as any); // Ignoring method overloads
  }

  public async update(id: number, dto: TUpdateDto): Promise<boolean>;
  public async update(ids: number[], dto: TUpdateDto): Promise<boolean>;

  public async update(
    idOrIds: number | number[],
    dto: TUpdateDto,
  ): Promise<boolean> {
    const result = await this.repository.update(idOrIds, dto);

    return !!result.affected;
  }

  public async remove(id: number): Promise<boolean>;
  public async remove(ids: number[]): Promise<boolean>;

  public async remove(idOrIds: number | number[]): Promise<boolean> {
    const result = await this.repository.delete(idOrIds);

    return !!result.affected;
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
