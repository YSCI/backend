import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { BaseController } from 'src/common/base/controller.base';
import { PathParams } from 'src/common/types/path-params.type';
import { Request } from 'src/common/types/request.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersFilter } from './types/users-filter.type';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends BaseController<
  User,
  UsersFilter,
  CreateUserDto,
  UpdateUserDto,
  UserService
>(CreateUserDto, UpdateUserDto, UsersFilter) {
  constructor(
    service: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    super(service, User.name);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await super.create(
      Object.assign(createUserDto, { creatorId: this.request.user.id }),
    );
    delete user.password;

    return user;
  }

  @Put(':id')
  async update(
    @Param() params: PathParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await super.update(
      params,
      Object.assign(updateUserDto, { updaterId: this.request.user.id }),
    );
  }
}
