import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EducationStatus } from 'src/common/enums/education-status.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { Pagination } from 'src/common/types/pagination.type';

export class StudentFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public fathername: string;

  @IsOptional()
  @IsInt()
  @IsEnum(Gender)
  public gender: Gender;

  @IsOptional()
  @IsBoolean()
  public hasPension: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public dateOfBirthStart: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public dateOfBirthEnd: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public registrationRegionId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public registrationCommunityId: number;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public residentAddress: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public passportSeries: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  public socialCardNumber: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public contactNumber: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public citizenshipId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public nationalityId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public professionId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public healthStatusId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public statusId: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  public educationStatus: EducationStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  public commissariatId: number;

  @IsOptional()
  @IsNumber()
  public dateOfAcceptanceStart: number;

  @IsOptional()
  @IsNumber()
  public dateOfAcceptanceEnd: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public acceptanceCommandNumber: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public commandId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public groupId: number;

  @IsOptional()
  @IsInt()
  public semester: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public subprivileges: Array<number>;
}
