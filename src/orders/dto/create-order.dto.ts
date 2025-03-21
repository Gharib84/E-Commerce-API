import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal,IsPositive,IsString,IsUUID } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        description: 'Order ID',
        type: 'string',
    })
    @IsString({
        message:"Order ID should be a string"
    })
    @IsUUID('all',{
        message:"Order ID should be a valid UUID"})
    orderId:string

    @IsString({
        message:"prodcut id should be a string"
    })
    @ApiProperty({
        description: 'Product ID',
        type: 'string',
    })
    @IsUUID('all',{
        message:"Product ID should be a valid UUID"
    })
    productId:string;

    @IsPositive({
        message:"Quantity should be a positive number"
    })
    @ApiProperty({
        description: 'Order Quantity',
        type: 'number',
    })
    quantity:number

    @IsDecimal(
        { decimal_digits: '2' },
        { message: 'totalPrice must be a decimal number' },
      )
    @ApiProperty({
        description: 'Product price',
        type: 'number'
    })
    totalPrice:number
}
