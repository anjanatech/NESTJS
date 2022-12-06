import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthUserDto{
    
    userName: string;

    
    password: string;  
}