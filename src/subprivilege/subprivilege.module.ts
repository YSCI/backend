import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subprivilege } from './entities/subprivilege.entity';
import { SubprivilegeController } from './subprivilege.controller';
import { SubprivilegeService } from './subprivilege.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subprivilege])],
  controllers: [SubprivilegeController],
  providers: [SubprivilegeService],
})
export class SubprivilegeModule {}
