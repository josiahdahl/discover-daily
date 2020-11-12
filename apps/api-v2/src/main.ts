import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
const session = require('express-session');
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ConfigService } from '@nestjs/config';
import { KnexMigrationService } from './app/database/services/knex-migration.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { REDIS_CLIENT } from './app/database/providers/redis-client.provider';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const migrationService: KnexMigrationService = app.get(KnexMigrationService);
  await migrationService.latest();
  app.use(helmet());

  const RedisStore = connectRedis(session);
  const redisClient = app.get(REDIS_CLIENT);
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: config.get('app.sessionSecretKey'),
      cookie: {
        secure: environment.production,
        maxAge: 60 * 60 * 24 * 30 /* 30 days */,
      },
      resave: true,
      saveUninitialized: true,
    })
  );
  app.set('trust proxy', 1);
  const port = config.get('app.port');
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
