import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCitizenshipDto {
  @IsString()
  @IsNotEmpty()
  public country: string;
}
