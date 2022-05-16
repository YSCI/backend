import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CitizenshipModule } from './citizenship/citizenship.module';
import { CommandHistoryModule } from './command-history/command-history.module';
import { CommandModule } from './command/command.module';
import { CommisariatModule } from './commissariat/commissariat.module';
import config from './common/configs/app.config';
import { GlobalExceptionFilter } from './common/exceptions/global.exception-filter';
import { CommunityModule } from './community/community.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import dataSource from './data-source';
import { GroupModule } from './group/group.module';
import { HealthStatusModule } from './health-status/health-status.module';
import { NationalityModule } from './nationality/nationality.module';
import { PrivilegeModule } from './privilege/privilege.module';
import { ProfessionModule } from './profession/profession.module';
import { RatingModule } from './rating/rating.module';
import { RegionModule } from './region/region.module';
import { StatusModule } from './status/status.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { SubprivilegeModule } from './subprivilege/subprivilege.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDevelopment =
          config.get<string>('global.environment') === 'development';

        return Object.assign(dataSource.options, {
          synchronize: !!process.env.DB_SYNC,
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
    NationalityModule,
    PrivilegeModule,
    SubprivilegeModule,
    CommisariatModule,
    CommandModule,
    CommandHistoryModule,
    StudentModule,
    SubjectModule,
    GroupModule,
    CurriculumModule,
    RatingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
