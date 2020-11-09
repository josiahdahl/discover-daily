import { Module } from '@nestjs/common';
import {
  ObjectionModule,
  ObjectionModuleOptions,
} from '@willsoto/nestjs-objection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { KnexMigrationService } from './services/knex-migration.service';
import { REDIS_CLIENT, redisProvider } from './providers/redis-client.provider';

@Module({
  providers: [KnexMigrationService, redisProvider],
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService): ObjectionModuleOptions {
        return {
          config: {
            ...config.get<knex.Config>('database'),
            ...knexSnakeCaseMappers(),
          },
        };
      },
    }),
    ConfigModule,
  ],
  exports: [ObjectionModule, KnexMigrationService, REDIS_CLIENT],
})
export class DatabaseModule {}
