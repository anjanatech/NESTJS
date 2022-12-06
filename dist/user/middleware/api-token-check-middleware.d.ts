import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class ApiTokemCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
