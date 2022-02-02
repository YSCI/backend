import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersFilter } from './types/users-filter.type';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
  }

  async findAll(filters: UsersFilter) {
    const { name, surname, username, limit, offset, orderBy, orderDirection } =
      filters;
    const where: FindCondition<User> = {};

    if (name) {
      where.name = ILike(name + '%');
    }

    if (surname) {
      where.surname = ILike(surname + '%');
    }

    if (username) {
      where.username = ILike(username + '%');
    }

    return await this.userRepository.find({
      where,
      order: { [orderBy]: orderDirection },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateResult = await this.userRepository.update(id, updateUserDto);

    if (!updateResult.affected) {
      throw new NotFoundException('User not found');
    }

    return { ok: true };
  }

  async remove(id: number) {
    const deleteResult = await this.userRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException('User not found');
    }

    return { ok: true };
  }
}
