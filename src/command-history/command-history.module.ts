import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHistoryController } from './command-history.controller';
import { CommandHistoryService } from './command-history.service';
import { CommandHistory } from './entities/command-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommandHistory])],
  controllers: [CommandHistoryController],
  providers: [CommandHistoryService],
  exports: [CommandHistoryService],
})
export class CommandHistoryModule {}
