import { IsNotEmpty, IsString } from 'class-validator';

export class ExportColumnsDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
