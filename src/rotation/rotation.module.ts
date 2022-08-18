import { Module } from '@nestjs/common';
import { GroupModule } from 'src/group/group.module';
import { ProfessionModule } from 'src/profession/profession.module';
import { StudentModule } from 'src/student/student.module';
import { SubjectModule } from 'src/subject/subject.module';
import { RotationController } from './rotation.controller';
import { RotationService } from './rotation.service';

@Module({
  imports: [StudentModule, GroupModule, SubjectModule, ProfessionModule],
  providers: [RotationService],
  controllers: [RotationController],
})
export class RotationModule {}
