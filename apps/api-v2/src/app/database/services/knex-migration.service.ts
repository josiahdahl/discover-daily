import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as knex from 'knex';
import { DatabaseConfig } from '../../../config/database.config';

@Injectable()
export class KnexMigrationService {
  constructor(private config: ConfigService) {}
  latest() {
    const dbConfig = this.config.get<DatabaseConfig>('database');
    return knex(dbConfig).migrate.latest();
  }
}
