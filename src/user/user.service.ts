import { AuthUserDto } from './dto/AuthUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './models/user.model';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/Jwt-payload-Interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User ,private jwtService:JwtService) { }
    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }
    async findOne(id: string): Promise<User> {
        const found = this.userModel.findOne({
            where: {
                id,
            },
        });
        if (!found) {
            throw new NotFoundException(`Task with  is not found`);
        } else
            return found

    }
   
    async createUser(user1: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user1.password, salt);
        const createUser = this.userModel.create({ firstName: user1.firstName, lastName: user1.lastName, userName: user1.userName, password: hashedPassword });
        try {
            return await createUser
        }
        catch (error) {
            if (error.errors[0].type === 'unique violation') {
                throw new ConflictException(error.errors[0].message)
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }




    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
    async update(id: string, UpdateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        user.firstName = UpdateUserDto.firstName || user.firstName;
        user.lastName = UpdateUserDto.lastName || user.lastName;
        const data = await user.save();
        return data;
    }
    async signin(authUserDto:AuthUserDto):Promise<{accessToken:string}>{
      const {userName,password}= authUserDto
      const user = await this.userModel.findOne({where:{userName}})
      if(user&& (await bcrypt.compare(password,user.password))){
       const payload : JwtPayload={ userName };
       const accessToken : string = await this.jwtService.sign(payload);
       return { accessToken}
      }else {
        throw new UnauthorizedException('Your login credentials are wrong')
      }
    }
}
