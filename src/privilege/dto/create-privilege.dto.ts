import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePrivilegeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
