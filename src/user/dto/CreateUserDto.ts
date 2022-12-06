import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()

    firstName: string;

    @IsNotEmpty()
    @IsString()

    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userName: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'Password is too weak'})
    password: string;

}