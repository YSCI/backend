import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsString()
  @IsNotEmpty()
  public fathername: string;

  @IsDateString()
  public dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  public registrationAddress: string;

  @IsString()
  @IsNotEmpty()
  public residentAddress: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public contactNumbers: Array<string>;

  @IsInt()
  @Min(1)
  public citizenshipId: number;

  @IsInt()
  @Min(1)
  public nationalityId: number;

  @IsInt()
  @Min(1)
  public professionId: number;

  @IsInt()
  @Min(1)
  public healthStatusId: number;

  @IsInt()
  @Min(1)
  public statusId: number;

  @IsInt()
  @Min(1)
  public commissariatId: number;

  @IsDateString()
  public dateOfAcceptance: string;

  @IsString()
  @IsNotEmpty()
  public acceptanceCommandNumber: string;

  @IsInt()
  public currentCourse: number;

  @IsString()
  @IsNotEmpty()
  public currentGroup: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public subprivileges: Array<number>;
}
