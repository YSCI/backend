import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitizenshipController } from './citizenship.controller';
import { CitizenshipService } from './citizenship.service';
import { Citizenship } from './entities/citizenship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Citizenship])],
  controllers: [CitizenshipController],
  providers: [CitizenshipService],
})
export class CitizenshipModule {}
