import { Controller, Get, Post, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() login: LoginUserDto) {
        return this.authService.login(login);
    }

    @Post('register')
    /**
     * Registers a new user in the database.
     * @param user the user data to store.
     * @returns a newly created user.
     * @throws Error if the registration fails.
     */
    register(@Body() user: CreateUserDto) {
        return this.authService.register(user);
    }
}
