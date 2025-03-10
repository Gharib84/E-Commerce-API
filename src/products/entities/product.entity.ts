import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column()
    price: number;
}
