import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { IOk } from 'src/common/types/ok.type';
import { RotationService } from 'src/rotation/rotation.service';
import { StudentRotationDto } from './dto/student-rotation.dto';
import { RotationFilter } from '../common/types/rotation-filter.type';
import { DateTime } from 'luxon';
import { Response } from 'express';
import { ResponseHelpers } from 'src/common/helpers/response.helper';

@Controller('rotation')
export class RotationController {
  constructor(private readonly rotationService: RotationService) {}

  @Post()
  async rotate(@Body() { studentIds }: StudentRotationDto): Promise<IOk> {
    await this.rotationService.rotate(studentIds);
    return { ok: true };
  }

  @Get()
  async findAll(@Query() filters: RotationFilter, @Res() res: Response) {
    const data = await this.rotationService.findAllAndCalculateRatesSum(
      filters,
    );

    if (filters.export) {
      const outputFileName = `rotation_report_${DateTime.now().toFormat(
        'dd-MM-yyyy_HH:mm:ss',
      )}.xlsx`;
      ResponseHelpers.setHeadersForExcelReport(res, outputFileName);
    }

    res.send(data);
  }
}
