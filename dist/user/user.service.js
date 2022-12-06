"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./models/user.model");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.userModel.findAll();
    }
    async findOne(id) {
        const found = this.userModel.findOne({
            where: {
                id,
            },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Task with  is not found`);
        }
        else
            return found;
    }
    async createUser(user1) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user1.password, salt);
        const createUser = this.userModel.create({ firstName: user1.firstName, lastName: user1.lastName, userName: user1.userName, password: hashedPassword });
        try {
            return await createUser;
        }
        catch (error) {
            if (error.errors[0].type === 'unique violation') {
                throw new common_1.ConflictException(error.errors[0].message);
            }
            else {
                throw new common_1.InternalServerErrorException(error);
            }
        }
    }
    async remove(id) {
        const user = await this.findOne(id);
        await user.destroy();
    }
    async update(id, UpdateUserDto) {
        const user = await this.findOne(id);
        user.firstName = UpdateUserDto.firstName || user.firstName;
        user.lastName = UpdateUserDto.lastName || user.lastName;
        const data = await user.save();
        return data;
    }
    async signin(authUserDto) {
        const { userName, password } = authUserDto;
        const user = await this.userModel.findOne({ where: { userName } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { userName };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('Your login credentials are wrong');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map