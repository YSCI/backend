import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IOk } from 'src/common/types/ok.type';
import { PensionService } from 'src/pension/pension.service';
import { RotationFilter } from '../common/types/rotation-filter.type';
import { StudentPensionDto } from './dto/student-pension.dto';

@Controller('pension')
export class PensionController {
  constructor(private readonly pensionService: PensionService) {}

  @Post()
  async assignPension(@Body() { studentIds }: StudentPensionDto): Promise<IOk> {
    await this.pensionService.assignPension(studentIds);
    return { ok: true };
  }

  @Get()
  async findAll(@Query() filters: RotationFilter) {
    return await this.pensionService.findAll(filters);
  }
}
