import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindResult } from 'src/common/types/find-result.type';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersFilter } from './types/users-filter.type';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto, creatorId: number) {
    return await this.userRepository.save(
      this.userRepository.create({ ...createUserDto, creatorId }),
    );
  }

  async findAll(filters: UsersFilter): Promise<IFindResult<User>> {
    const {
      name,
      surname,
      username,
      creatorId,
      updaterId,
      limit,
      offset,
      orderBy,
      orderDirection,
    } = filters;
    const where: FindOptionsWhere<User> = {};

    if (name) {
      where.name = ILike(name + '%');
    }

    if (surname) {
      where.surname = ILike(surname + '%');
    }

    if (username) {
      where.username = ILike(username + '%');
    }

    if (creatorId) {
      where.creatorId = creatorId;
    }

    if (updaterId) {
      where.updaterId = updaterId;
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      order: { [orderBy]: orderDirection },
      relations: {
        creator: true,
        updater: true,
      },
      take: limit,
      skip: offset,
    });
    return { data, total };
  }

  async findOne(id: number) {
    const [user] = await this.userRepository.find({
      where: { id },
      relations: {
        creator: true,
        updater: true,
      },
    });

    return user;
  }

  async findByUsername(username: string) {
    const [user] = await this.userRepository.find({
      where: { username },
      select: {
        password: true,
        id: true,
        username: true,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, updaterId: number) {
    const updateResult = await this.userRepository.update(
      id,
      this.userRepository.create({
        ...updateUserDto,
        updaterId,
      }),
    );

    if (!updateResult.affected) {
      throw new NotFoundException('User not found');
    }

    return { ok: true };
  }

  async remove(ids: number[]) {
    const result = await this.userRepository.delete(ids);

    if (!result.affected) {
      throw new NotFoundException('User not found');
    }

    return { ok: true };
  }
}
