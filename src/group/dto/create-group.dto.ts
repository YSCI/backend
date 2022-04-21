import { IsInt, IsNumberString, IsOptional, Min } from 'class-validator';

export class CreateGroupDto {
  @IsNumberString()
  public number: string;

  @IsInt()
  @Min(1)
  public currentSemester: number;

  @IsOptional()
  @IsNumberString()
  public auditorium?: string;

  @IsInt()
  @Min(1)
  public professionId: number;
}
