import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { PaginationService } from 'src/common/pagination.service';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}
  async create(createOrderDto: CreateOrderDto):Promise<Order | null> {
    try {
      const {productId,quantity,totalPrice}=createOrderDto;
      const product = await this.productRepository.findOneBy({id:productId});

      if(!product){
        throw new Error('Product not found');
      }

      const order = await this.orderRepository.create({
        product,
        quantity,
        totalPrice
      });

      await this.orderRepository.save(order);
    

    } catch (error) {
      throw new Error(error.message);
    }

    return null;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async getOrders(page:number = 1,limit:number = 10){
    try {
      const orders = await this.orderRepository.find({
        skip:(page-1)*limit,
        take:limit,
        relations:['product'],
        select:{
          product:{
            name:true,
            price:true,
            image : true
          }
        }
      });
      return {orders};
    } catch (error) {
      throw new Error(error.message);
    }
  }

/**
 * Retrieves an order by its ID.
 * @param id - The ID of the order to retrieve.
 * @returns The order with its related product details if found, or null if not found.
 * @throws Error if there is an issue retrieving the order.
 */

  async getOrderById(id:number):Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where:{id},
        relations:['product'],
      })

      if(!order){
        throw new NotFoundException('`Order with id ${id} not found`');
      }

      return order;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
