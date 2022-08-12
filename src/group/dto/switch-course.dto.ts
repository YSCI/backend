import { ArrayNotEmpty, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class SwitchSemesterDto {
  @ArrayNotEmpty()
  @IsInt({ each: true })
  public groupIds: Array<number>;

  @IsOptional()
  @IsBoolean()
  public isPositive = true;
}
