import { IsInt, Max, Min } from 'class-validator';

export class UpsertRatingDto {
  @IsInt()
  @Min(1)
  public subjectId: number;

  @IsInt()
  @Min(1)
  public studentId: number;

  @IsInt()
  @Min(1)
  public semester: number;

  @IsInt()
  @Min(1)
  @Max(10)
  public rate: number;
}
