import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpsertRatingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  public id: number;

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
  public rate: number;
}
