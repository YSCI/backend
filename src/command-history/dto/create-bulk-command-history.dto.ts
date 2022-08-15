import { ArrayNotEmpty, ArrayUnique, IsInt, Min } from 'class-validator';
import { CreateCommandHistoryDto } from './create-command-history.dto';

export class CreateBulkCommandHistoryDto extends CreateCommandHistoryDto {
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public studentIds: number[];
}
