import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersFilter } from './types/users-filter.type';

@Injectable()
export class UserService extends BaseService<
  User,
  UsersFilter,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  async findByUsername(username: string) {
    const [user] = await this.repository.find({
      where: { username },
      select: {
        password: true,
        id: true,
        username: true,
      },
    });

    return user;
  }

  protected getFiltersConfiguration(
    filters: UsersFilter,
  ): FindManyOptions<User> {
    const where: FindOptionsWhere<User> = {};

    if (filters.name) where.name = ILike(filters.name + '%');
    if (filters.surname) where.surname = ILike(filters.surname + '%');
    if (filters.username) where.username = ILike(filters.username + '%');
    if (filters.creatorId) where.creatorId = filters.creatorId;
    if (filters.updaterId) where.updaterId = filters.updaterId;

    const findOpts = attachPagination<User>(filters);
    findOpts.where = where;

    return findOpts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<User> {
    return {
      creator: true,
      updater: true,
    };
  }
}
