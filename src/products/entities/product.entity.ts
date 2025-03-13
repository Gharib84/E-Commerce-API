import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "src/orders/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', {
        default: 0
    })
    price: number;

    @Column('simple-json', {
        default: {}
    })
    space:Record<string, string>;

    @Column('text',{
        default: 'no-image.png'
    })
    image: string;

    @ApiProperty({
        type: () => [Order]
    })
    @OneToMany(() => Order, order => order.product)
    orders: Order[]

    @Column('timestamp',{
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;
}
