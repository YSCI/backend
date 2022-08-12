import { Module } from '@nestjs/common';
import { GroupModule } from 'src/group/group.module';
import { StudentModule } from 'src/student/student.module';
import { PensionController } from './pension.controller';
import { PensionService } from './pension.service';

@Module({
  imports: [StudentModule, GroupModule],
  providers: [PensionService],
  controllers: [PensionController],
})
export class PensionModule {}
