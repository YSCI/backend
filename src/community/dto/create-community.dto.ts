import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @Min(1)
  public regionId: number;

  @IsBoolean()
  public isFrontier: boolean;
}
