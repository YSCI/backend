import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNationalityDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
