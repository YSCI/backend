import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandHistoryDto } from './create-command-history.dto';

export class UpdateCommandHistoryDto extends PartialType(
  CreateCommandHistoryDto,
) {}
