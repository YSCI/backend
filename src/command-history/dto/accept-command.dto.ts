import { IsInt, Min } from 'class-validator';

export class AcceptCommandDto {
  @IsInt()
  @Min(1)
  public studentCommandId: number;
}
