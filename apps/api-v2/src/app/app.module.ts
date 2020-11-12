import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '../config/app.config';
import { spotifyConfig } from '../config/spotify.config';
import { databaseConfig } from '../config/database.config';
import { UserModule } from './user/user.module';
import { SessionUserMiddleware } from './auth/middleware/session-user.middleware';
import { redisConfig } from '../config/redis.config';
import { AlbumsModule } from './albums/albums.module';
import { CsurfMiddleware } from './auth/middleware/csurf.middleware';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [appConfig, spotifyConfig, databaseConfig, redisConfig],
    }),
    UserModule,
    AlbumsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(SessionUserMiddleware).exclude('auth/(.*)').forRoutes('*');
    consumer.apply(CsurfMiddleware).exclude('/auth/logout').forRoutes('*');
  }
}
