import {
  ArrayNotEmpty,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { EducationBasis } from 'src/common/enums/education-basis.enum';
import { EducationStatus } from 'src/common/enums/education-status.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { PassportType } from 'src/common/enums/passport-type.enum';
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
  @IsDate()
  public dateOfBirthStart: Date;

  @IsOptional()
  @IsDate()
  public dateOfBirthEnd: Date;

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
  @IsDate()
  public passportDateOfIssueStart: Date;

  @IsOptional()
  @IsDate()
  public passportDateOfIssueEnd: Date;

  @IsOptional()
  @IsDate()
  public passportValidUntilStart: Date;

  @IsOptional()
  @IsDate()
  public passportValidUntilEnd: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  public passportIssuedBy: string;

  @IsOptional()
  @IsInt()
  @IsEnum(PassportType)
  public passportType: PassportType;

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
  @IsEnum(EducationBasis)
  public educationBasis: EducationBasis;

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
  @IsDate()
  public dateOfAcceptanceStart: Date;

  @IsOptional()
  @IsDate()
  public dateOfAcceptanceEnd: Date;

  @IsOptional()
  @IsDate()
  public commandStartDate: Date = new Date('1955');

  @IsOptional()
  @IsDate()
  public commandEndDate: Date = new Date();

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
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  public privileges: Array<number>;

  @IsOptional()
  @IsDate()
  public privilegeExpirationDate: Date;
}
