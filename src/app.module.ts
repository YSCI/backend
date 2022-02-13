import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import config from './common/configs/app.config';
import { GlobalExceptionFilter } from './common/exceptions/global.exception-filter';
import { ProfessionModule } from './profession/profession.module';
import { UserModule } from './user/user.module';
import { CitizenshipModule } from './citizenship/citizenship.module';
import { HealthStatusModule } from './health-status/health-status.module';
import { RegionModule } from './region/region.module';
import { CommunityModule } from './community/community.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isDevelopment =
          config.get<string>('global.environment') === 'development';
        const connectionOpts = await getConnectionOptions();

        return Object.assign(connectionOpts, {
          synchronize: isDevelopment,
          logging: isDevelopment ? true : ['error'],
          logger: isDevelopment ? 'advanced-console' : 'file',
        });
      },
    }),
    UserModule,
    AuthModule,
    ProfessionModule,
    CitizenshipModule,
    HealthStatusModule,
    RegionModule,
    CommunityModule,
    StatusModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
