import { IsDate, IsInt, Min } from 'class-validator';

export class AddSubprivilegeDto {
  @IsInt()
  @Min(1)
  public subprivilegeId: number;

  @IsDate()
  public expirationDate: Date;
}
