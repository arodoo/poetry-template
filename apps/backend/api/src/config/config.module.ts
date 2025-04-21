import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './database/database.config';
import authConfig from './auth.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
  ],
  exports: [DatabaseModule],
})
export class ConfigModule {}