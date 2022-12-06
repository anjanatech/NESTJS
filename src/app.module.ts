import {  ApiTokemCheckMiddleware } from './user/middleware/api-token-check-middleware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod, Delete } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import path from 'path';
import { METHODS } from 'http';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Database123',
    database: 'Demo',
    autoLoadModels: true,
    synchronize: true,
  }),
  UserModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokemCheckMiddleware).forRoutes({path:'*', method:RequestMethod.ALL})
  }
}
