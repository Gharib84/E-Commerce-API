import { IsDecimal, IsObject, IsString, IsUrl, Length, Validate, validate } from 'class-validator';
import { ProductSpecs } from '../product-specs/product-specs';
import { ProductDescription } from '../product-description/product-description';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
    @ApiProperty({
        description: 'Product name',
    })
    @IsString({
        message: 'Name should be a string'
    })
    @Length(5, 25, {
        message: 'Name should be between 3 and 50 characters'
    })
    name: string;

    @ApiProperty({
        description: 'Product description',
    })
    @IsString({
        message: 'Description should be a string'
    })
    @Length(25, 255, {
        message: 'Description should be between 5 and 255 characters'
    })
    @Validate(ProductDescription)
    description: string;

    @ApiProperty({
        description: 'Product price',
        type: 'number'
    })
    @IsDecimal(
        {
            decimal_digits: '2',
        }
    )
    price: number;

    @ApiProperty({
        description: 'Product specs',
    }) 
    @IsObject({
        message: 'Product specs should be an object'
    })
    @Validate(ProductSpecs)
    specs: Record<string, string>;

    @ApiProperty({
        description: 'Product image',
    })  
    @IsUrl({
        'require_protocol': true
    },
        {
            'message': 'Image should be a valid url'
        })
    image: string;
}
