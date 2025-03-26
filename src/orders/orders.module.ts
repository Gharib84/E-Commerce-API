import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { PaginationService } from 'src/common/pagination.service';
import { CommonModule } from 'src/common/common.module';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [OrdersController],
  providers: [OrdersService,PaginationService],
  imports:[TypeOrmModule.forFeature([Order,Product,User]),CommonModule,AuthModule],
  exports:[OrdersService]
})
export class OrdersModule {}
