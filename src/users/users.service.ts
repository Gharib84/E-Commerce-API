import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>
  ) { }

  /**
   * Create a new user in the database.
   * @param createUserDto the data to be inserted in the database
   * @returns the newly created user, or undefined if an error occurs
   * @throws Error if the create operation fails
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Finds a user by id.
   * @param id the id of the user
   * @returns the user if found, or undefined if not found
   * @throws Error if the user is not found
   */
  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id }, relations: ['orders'] });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Finds a user by username.
   * @param username the username of the user
   * @returns the user if found, or undefined if not found
   * @throws Error if the user is not found
   */
  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { username }, relations: ['orders'] });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
