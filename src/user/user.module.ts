import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import{ JwtModule} from '@nestjs/jwt';
@Module({
  imports : [PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.register({
    secret:'topSecret51',
    signOptions:{
      expiresIn:3600
    }
}),
SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
