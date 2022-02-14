import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCommissariatDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  public number: number;

  @IsInt()
  @Min(1)
  public communityId: number;
}
