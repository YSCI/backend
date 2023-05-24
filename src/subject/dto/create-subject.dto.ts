import {
  ArrayNotEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PointSystem } from 'src/common/enums/point-system.enum';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @Min(1)
  public professionId: number;

  @IsOptional()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public semesters: Array<number>;

  @IsNumber()
  public number: number;

  @IsEnum(PointSystem)
  @IsOptional()
  public pointSystem: PointSystem = PointSystem.Ten;
}
