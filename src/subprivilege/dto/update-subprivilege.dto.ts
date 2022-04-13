import { PartialType } from '@nestjs/mapped-types';
import { CreateSubprivilegeDto } from './create-subprivilege.dto';

export class UpdateSubprivilegeDto extends PartialType(CreateSubprivilegeDto) {}
