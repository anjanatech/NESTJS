import { JwtPayload } from './dto/Jwt-payload-Interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';


@Injectable()
export class Jwtstartegy extends PassportStrategy(Strategy){
    constructor(@InjectModel(User) private userModel) {
        super({
          secretorKey :'topSecret51',
          jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload:JwtPayload):{
        const {userName} = payload;
    }
}
