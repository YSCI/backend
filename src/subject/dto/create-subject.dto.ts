import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @Min(1)
  public professionId: number;
}
