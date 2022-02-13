import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege } from './entities/privilege.entity';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeService } from './privilege.service';

@Module({
  imports: [TypeOrmModule.forFeature([Privilege])],
  controllers: [PrivilegeController],
  providers: [PrivilegeService],
})
export class PrivilegeModule {}
