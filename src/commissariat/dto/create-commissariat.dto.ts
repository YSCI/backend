import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommissariatDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  public number: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;
}
