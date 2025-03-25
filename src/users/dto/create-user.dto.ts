import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword, IsEmail, Length } from "class-validator";
export class CreateUserDto {
    @ApiProperty({
        description: 'User name',
    })
    @IsString({
        message: 'Name should be a string'
    })
    @Length(8, 20, {
        message: 'Name should be between 3 and 50 characters'
    })
    username: string

    @ApiProperty({
        description: 'User email',
    })
    @IsString({
        message: 'Email should be a string'
    })
    @IsEmail({}, {
        message: 'Email should be a valid email'
    })
    email: string

    @ApiProperty({
        description: 'User password',
    })
    @IsString({
        message: 'Password should be contain at least one lowercase letter, one uppercase letter, one number, and one symbol'
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string
}
