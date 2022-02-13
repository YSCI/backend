import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthStatus } from './entities/health-status.entity';
import { HealthStatusController } from './health-status.controller';
import { HealthStatusService } from './health-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthStatus])],
  controllers: [HealthStatusController],
  providers: [HealthStatusService],
})
export class HealthStatusModule {}
