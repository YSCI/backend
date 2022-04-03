import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommissariatDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  public number: number;

  @IsString()
  @IsNotEmpty()
  public description: string;
}
