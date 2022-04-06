import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSubprivilegeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @Min(1)
  public privilegeId: number;
}
