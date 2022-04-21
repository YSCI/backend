import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
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
  public currentCourse: number;

  @IsOptional()
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
