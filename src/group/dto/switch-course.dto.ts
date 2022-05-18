import { ArrayNotEmpty, IsInt } from 'class-validator';

export class SwitchCourseDto {
  @ArrayNotEmpty()
  @IsInt({ each: true })
  public groupIds: Array<number>;
}
