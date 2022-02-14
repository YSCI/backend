import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissariatController } from './commissariat.controller';
import { CommissariatService } from './commissariat.service';
import { Commissariat } from './entities/commissariat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commissariat])],
  controllers: [CommissariatController],
  providers: [CommissariatService],
})
export class CommisariatModule {}
