import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { BatchDelete } from 'src/common/types/batch-delete.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersFilter } from './types/users-filter.type';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req) {
    const user = await this.userService.create(createUserDto, req.user.id);
    delete user.password;

    return user;
  }

  @Get()
  async indAll(@Query() filters: UsersFilter) {
    return await this.userService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Put(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return await this.userService.update(id, updateUserDto, req.user.id);
  }

  @Delete()
  async remove(@Query() { ids }: BatchDelete) {
    return await this.userService.remove(ids);
  }
}
