import { ArrayNotEmpty, IsInt } from 'class-validator';

export class GraduationInfoDto {
  @ArrayNotEmpty()
  @IsInt({ each: true })
  public groupIds: Array<number>;
}
