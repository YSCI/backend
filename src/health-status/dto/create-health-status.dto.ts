import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHealthStatusDto {
  @IsString()
  @IsNotEmpty()
  public status: string;
}
