import { Module } from '@nestjs/common';
import { GroupModule } from 'src/group/group.module';
import { StudentModule } from 'src/student/student.module';
import { RotationController } from './rotation.controller';
import { RotationService } from './rotation.service';

@Module({
  imports: [StudentModule, GroupModule],
  providers: [RotationService],
  controllers: [RotationController],
})
export class RotationModule {}
