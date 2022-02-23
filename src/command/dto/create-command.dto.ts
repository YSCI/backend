import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommandDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsInt()
  public changeableStatusId?: number;
}
