import { ArrayNotEmpty, IsInt, Min } from 'class-validator';

export class StudentPensionDto {
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public studentIds: number[];
}
