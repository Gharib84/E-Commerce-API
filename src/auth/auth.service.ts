import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt-ts';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }

    /**
     * Verifies that a given password matches the hashed password for a given user.
     * @param user The user to check the password for.
     * @param password The password to check.
     * @param hashedPassword The hashed password to compare against.
     * @returns true if the password matches, false if not.
     */
    async varifyPassword(user: User, password: string, hashedPassword: string) {
        return user && (await bcrypt.compare(password, hashedPassword));
    }

    async login(username: string, password: string) {
        try {
            const user = await this.usersService.getUserByUsername(username);
            if (user && (await this.varifyPassword(user, password, user.password))) {
                delete (user as { password?: string }).password;
                const accessToken = await this.jwtService.signAsync({
                    sub: user.id,
                    username: user.username
                });

                return {
                    message: 'Login successful',
                    data: {
                        ...user,
                        accessToken

                    }
                }
            }

            return {
                message: 'Login failed',
                data: null,
                error: {
                    message: 'Invalid username or password'
                }
            }

        } catch (error) {
            throw new Error(error.message); 

        }
    }
}
