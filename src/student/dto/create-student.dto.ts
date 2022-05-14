import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
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

  @IsBoolean()
  public hasPension: boolean;

  @IsDateString()
  public dateOfBirth: string;

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
  public professionId: number;

  @IsInt()
  @Min(1)
  public healthStatusId: number;

  @IsInt()
  @Min(1)
  public statusId: number;

  @IsInt()
  @IsPositive()
  public educationStatus: number;

  @IsInt()
  @Min(1)
  public commissariatId: number;

  @IsDateString()
  public dateOfAcceptance: string;

  @IsString()
  @IsNotEmpty()
  public acceptanceCommandNumber: string;

  @IsInt()
  @Min(1)
  public groupId: number;
}
