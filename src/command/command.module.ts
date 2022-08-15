import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';
import { Command } from './entities/command.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Command])],
  controllers: [CommandController],
  providers: [CommandService],
  exports: [CommandService],
})
export class CommandModule {}
