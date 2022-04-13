import { PartialType } from '@nestjs/mapped-types';
import { CreateCitizenshipDto } from './create-citizenship.dto';

export class UpdateCitizenshipDto extends PartialType(CreateCitizenshipDto) {}
