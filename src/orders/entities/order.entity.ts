import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status';
import { Product } from 'src/products/entities/product.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @ApiProperty({
        description: 'Order QUantity',
        type: 'number',
    })
    @Column({
        name: 'quantity',
        type: 'int',
    })
    quantity: number;

    @ApiProperty({
        description: 'Order status',
    })
    @Column({
        name: 'status',
        default:OrderStatus.PENDING
    })
    status: OrderStatus;

    @Column('decimal', {
        precision: 5,
        scale: 2,
        default: 0
    })
    totalPrice: number;

    @ManyToOne(() => Product, product => product.orders)
    product: Product;
    
    @ApiProperty({
        description: 'Order creation date',
    })
    @Column( {
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
