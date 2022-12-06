"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTokemCheckMiddleware = void 0;
const common_1 = require("@nestjs/common");
class ApiTokemCheckMiddleware {
    use(req, res, next) {
        if (req.headers['api-token'] != 'secretkey123')
            throw new common_1.BadRequestException('Token you provided does not match');
        next();
    }
}
exports.ApiTokemCheckMiddleware = ApiTokemCheckMiddleware;
//# sourceMappingURL=api-token-check-middleware.js.map