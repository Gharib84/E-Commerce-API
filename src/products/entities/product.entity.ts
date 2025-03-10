import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', {
        default: 0
    })
    price: number;

    @Column('text',{
        default: 'no-image.png'
    })
    image: string;
    
    @Column('simple-json', {
        default: {}
    })
    space:Record<string, string>;

    @Column('timestamp',{
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;
}
