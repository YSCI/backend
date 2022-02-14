import { PartialType } from '@nestjs/mapped-types';
import { CreateCommissariatDto } from './create-commissariat.dto';

export class UpdateCommissariatDto extends PartialType(CreateCommissariatDto) {}
