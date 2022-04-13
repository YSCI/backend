import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
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

    return await this.userRepository.find({
      where,
      order: { [orderBy]: orderDirection },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateResult = await this.userRepository.update(id, updateUserDto);

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
