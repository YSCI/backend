import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'src/command/command.module';
import { StudentModule } from 'src/student/student.module';
import { CommandHistoryController } from './command-history.controller';
import { CommandHistoryService } from './command-history.service';
import { CommandHistory } from './entities/command-history.entity';

@Module({
  imports: [
    CommandModule,
    StudentModule,
    TypeOrmModule.forFeature([CommandHistory]),
  ],
  controllers: [CommandHistoryController],
  providers: [CommandHistoryService],
})
export class CommandHistoryModule {}
