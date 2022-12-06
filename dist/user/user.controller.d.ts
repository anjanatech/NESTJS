import { AuthUserDto } from './dto/AuthUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    createData(data: CreateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    update(id: string, UpdateUserDto: UpdateUserDto): Promise<User>;
    signin(AuthUserDto: AuthUserDto): Promise<{
        accessToken: string;
    }>;
}
