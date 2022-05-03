import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';

export class CreateCommandDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @ValidateNested()
  public changeableColumns: UpdateStudentDto;
}
