import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { EducationBasis } from 'src/common/enums/education-basis.enum';
import { EducationStatus } from 'src/common/enums/education-status.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { PassportType } from 'src/common/enums/passport-type.enum';

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

  // @IsDate()
  public passportDateOfIssue: Date;

  // @IsString()
  // @IsNotEmpty()
  // @MaxLength(3)
  public passportIssuedBy: string;

  @IsInt()
  @IsEnum(PassportType)
  public passportType: PassportType;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  public socialCardNumber: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public contactNumbers: Array<string>;

  @IsInt()
  @IsEnum(EducationBasis)
  public educationBasis: EducationBasis;

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
  public privilegeId: number;

  @IsOptional()
  @IsDate()
  @ValidateIf((obj) => !!obj.privilegeId)
  @Transform((params) => (!!params.obj.privilegeId ? params.value : undefined))
  public privilegeExpirationDate: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  public currentSemester: number;
}
