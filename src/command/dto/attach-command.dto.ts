import {
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class AttachCommandDto {
  @IsInt()
  @Min(1)
  public commandId: number;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public studentIds: number[];

  @IsString()
  @IsNotEmpty()
  public commandNumber: string;
}
