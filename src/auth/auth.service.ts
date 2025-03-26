import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt-ts';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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

    /**
     * Logs in a user using the given username and password.
     * @param username The username to log in with.
     * @param password The password to log in with.
     * @returns an object with a success message, the user data, and an
     * access token if the login was successful. If the login fails, an
     * object with an error message is returned.
     */
    async login(login: LoginUserDto) {
        const { username, password } = login;
        try {
          const user = await this.usersService.getUserByUsername(username);
    
          if (user && await this.varifyPassword(user, password, user.password)) {
           //delete user?.password;
            const accessToken = await this.jwtService.signAsync({
              sub: user.id,
              username: user.username,
            });
    
            return {
              message: 'Login successful',
              data: {
                ...user,
                accessToken,
              },
            };
          }
    
          return {
            message: 'Invalid username or password',
            data: null,
          };
        } catch (error) {
          return error;
        }
      }

    /**
     * Hashes a given password using bcrypt with a cost of 10.
     * @param password The password to hash.
     * @returns The hashed password.
     */
    hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    /**
     * Registers a new user with the given details.
     * @param user The details of the user to register.
     * @returns A message indicating success or failure, and the newly created user if success.
     * @throws Error if the registration fails.
     */
    async register(user: CreateUserDto) {
        try {
            const hashedPassword = this.hashPassword(user.password);
            const newUser: CreateUserDto = {
                ...user,
                password: hashedPassword
            };

            return await this.usersService.create(newUser);

        } catch (error) {
            throw new Error(error.message);
        }
    }
}
