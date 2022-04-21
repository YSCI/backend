import { ArrayNotEmpty, IsInt, Min } from 'class-validator';

export class CreateCurriculumDto {
  @IsInt()
  @Min(1)
  public subjectId: number;

  @IsInt()
  @Min(1)
  public groupId: number;

  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public semesters: Array<number>;
}
