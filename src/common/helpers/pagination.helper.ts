import { FindManyOptions } from 'typeorm';
import { Pagination } from '../types/pagination.type';

export function attachPagination<T>(opts: Pagination): FindManyOptions<T> {
  const conditions: FindManyOptions = {
    take: opts.limit,
    skip: opts.offset,
    order: {
      [opts.orderBy]: opts.orderDirection,
    },
  };

  return conditions;
}

export function detachPagination<T>(
  findManyOptions: FindManyOptions<T>,
  opts?: { ignoreOrder: boolean },
) {
  delete findManyOptions.skip;
  delete findManyOptions.take;

  if (!opts?.ignoreOrder) {
    delete findManyOptions.order;
  }
}
