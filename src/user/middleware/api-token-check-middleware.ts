import { BadRequestException,  NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class ApiTokemCheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        if(req.headers['api-token']!='secretkey123')
        throw new BadRequestException('Token you provided does not match')
        next();
        
    }

}