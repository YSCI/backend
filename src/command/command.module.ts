import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHistoryModule } from 'src/command-history/command-history.module';
import { StudentModule } from 'src/student/student.module';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';
import { Command } from './entities/command.entity';

@Module({
  imports: [
    CommandHistoryModule,
    StudentModule,
    TypeOrmModule.forFeature([Command]),
  ],
  controllers: [CommandController],
  providers: [CommandService],
})
export class CommandModule {}
