import { AuthUserDto } from './dto/AuthUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.service';
import { Controller, Get, Post, Body, Param, Delete,Put} from '@nestjs/common';
import { BeforeDestroy, DeletedAt, UpdatedAt } from 'sequelize-typescript';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();

    }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {

        return this.userService.findOne(id);

    }
    @Post()
    createData(@Body() data: CreateUserDto) {
        return this.userService.createUser(data)
    }
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }
    @Put(':id')
    update(@Param('id') id:string ,@Body() UpdateUserDto:UpdateUserDto ){
        return this.userService.update(id,UpdateUserDto);
    }
    @Post('/signin')
    signin(@Body() AuthUserDto:AuthUserDto) :Promise<{accessToken:string}> {
        return this.userService.signin(AuthUserDto);
    }
    

}