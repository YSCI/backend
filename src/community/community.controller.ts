import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { CommunityFilter } from './types/community-filter.type';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  async create(@Body() createCommunityDto: CreateCommunityDto) {
    return await this.communityService.create(createCommunityDto);
  }

  @Get()
  async findAll(@Query() filters: CommunityFilter) {
    return await this.communityService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const community = await this.communityService.findOne(id);

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community;
  }

  @Patch(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ): Promise<IOk> {
    const result = await this.communityService.update(id, updateCommunityDto);

    if (!result) {
      throw new NotFoundException('Community not found');
    }

    return { ok: true };
  }

  @Delete(':id')
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.communityService.remove(id);

    if (!result) {
      throw new NotFoundException('Community not found');
    }

    return { ok: true };
  }
}
