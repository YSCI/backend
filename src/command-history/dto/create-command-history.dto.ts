import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';

export class CreateCommandHistoryDto {
  @IsInt()
  @Min(1)
  public commandId: number;

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

  public userId: number;
  public studentId: number;
}
