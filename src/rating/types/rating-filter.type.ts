import { IsInt, IsOptional, Min } from 'class-validator';

export class RatingFilter {
  @IsOptional()
  @IsInt()
  @Min(1)
  public studentId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public subjectId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public semester: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public rate: number;
}
