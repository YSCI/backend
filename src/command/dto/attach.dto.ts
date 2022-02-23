import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class AttachDto {
  @IsInt()
  @Min(1)
  public commandId: number;

  @IsInt()
  @Min(1)
  public studentId: number;

  @IsString()
  @IsNotEmpty()
  public commandNumber: string;
}
