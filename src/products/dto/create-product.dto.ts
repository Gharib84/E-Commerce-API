import { IsDecimal,IsObject,IsString,IsUrl,Length,Validate,validate } from 'class-validator';
import { ProductSpecs } from '../product-specs/product-specs';
export class CreateProductDto {
    @IsString({
        message: 'Name should be a string'
    })
    @Length(5, 25, {
        message: 'Name should be between 3 and 50 characters'
    })
    name: string;

    @IsString({
         message: 'Description should be a string'   
    })
    @Length(5, 255, {
        message: 'Description should be between 5 and 255 characters'
    })
    @Validate(ProductSpecs)
    description: string;


    price: number;
    image: string;
}
