import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateSubprivilegeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @IsPositive()
  public privilegeId: number;
}
