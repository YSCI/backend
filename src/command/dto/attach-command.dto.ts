import {
  ArrayNotEmpty,
  ArrayUnique,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';

export class AttachCommandDto {
  @IsInt()
  @Min(1)
  public commandId: number;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public studentIds: number[];

  @IsString()
  @IsNotEmpty()
  public commandNumber: string;

  @IsOptional()
  @IsDateString()
  public affectDate: string;

  @IsOptional()
  @ValidateNested()
  public changeableColumns: UpdateStudentDto;
}
