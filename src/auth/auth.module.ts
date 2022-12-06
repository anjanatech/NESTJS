import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';



@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
