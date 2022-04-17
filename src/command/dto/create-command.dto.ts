import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';

export class CreateCommandDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsObject()
  // TODO: add normal validations
  public changeableColumns: UpdateStudentDto;
}
