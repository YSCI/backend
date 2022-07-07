import {
  ArrayNotEmpty,
  ArrayUnique,
  IsDate,
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
  @IsDate()
  public affectDate: Date;

  @IsOptional()
  @ValidateNested()
  public changeableColumns: UpdateStudentDto;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;
}
