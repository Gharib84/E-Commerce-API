import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status';
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

    @ApiProperty({
        description: 'Order creation date',
    })
    @Column( {
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
