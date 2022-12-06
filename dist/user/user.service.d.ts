import { AuthUserDto } from './dto/AuthUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    createUser(user1: CreateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    update(id: string, UpdateUserDto: UpdateUserDto): Promise<User>;
    signin(authUserDto: AuthUserDto): Promise<{
        accessToken: string;
    }>;
}
