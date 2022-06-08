import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IOk } from 'src/common/types/ok.type';
import { RotationService } from 'src/rotation/rotation.service';
import { StudentRotationDto } from './dto/student-rotation.dto';
import { RotationFilter } from './types/rotation-filter.type';

@Controller('rotation')
export class RotationController {
  constructor(private readonly rotationService: RotationService) {}

  @Post()
  async rotate(@Body() { studentIds }: StudentRotationDto): Promise<IOk> {
    await this.rotationService.rotate(studentIds);
    return { ok: true };
  }

  @Get()
  async findAll(@Query() filters: RotationFilter) {
    return await this.rotationService.findAllAndCalculateRatesSum(filters);
  }
}
