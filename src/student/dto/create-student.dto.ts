import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { EducationStatus } from 'src/common/enums/education-status.enum';
import { Gender } from 'src/common/enums/gender.enum';

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

  @IsInt()
  @IsEnum(Gender)
  public gender: Gender;

  @IsDate()
  public dateOfBirth: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  public registrationRegionId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public registrationCommunityId: number;

  @IsString()
  @IsNotEmpty()
  public registrationAddress: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public residentRegionId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public residentCommunityId: number;

  @IsString()
  @IsNotEmpty()
  public residentAddress: string;

  @IsString()
  @IsNotEmpty()
  public passportSeries: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  public socialCardNumber: number;

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
  public healthStatusId: number;

  @IsInt()
  @Min(1)
  public statusId: number;

  @IsInt()
  @IsEnum(EducationStatus)
  public educationStatus: EducationStatus;

  @ValidateIf((object) => object.gender === Gender.Male)
  @IsInt()
  @Min(1)
  public commissariatId: number;

  @IsDate()
  public dateOfAcceptance: Date;

  @IsString()
  @IsNotEmpty()
  public acceptanceCommandNumber: string;

  @IsInt()
  @Min(1)
  public groupId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public currentSemester: number;
}
