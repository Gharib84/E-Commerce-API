import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
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
}
