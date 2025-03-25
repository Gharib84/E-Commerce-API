import { Order } from "src/orders/entities/order.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable } from "typeorm";
import { Roles } from "../enums/roles";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.USER
    })
    role: Roles;

    @OneToMany(()=> Order, (order) => order.customer)
    orders: Order[];

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date
}
