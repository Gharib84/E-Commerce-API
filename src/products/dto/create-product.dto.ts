import { IsDecimal,IsObject,IsString,IsUrl,Length,validate } from 'class-validator';
export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    image: string;
}
