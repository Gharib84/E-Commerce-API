import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  /**
   * Retrieves a list of products from the database.
   * @returns a list of products, or an empty list if no products are found
   */
  findAll() {
    return this.productsService.findAll();
  }

  @Get()
  /**
   * Get products in a paginated manner.
   * @param page the page to retrieve (starts at 1)
   * @param limit the number of products to retrieve per page (defaults to 10)
   * @returns a list of products, or an empty list if no products are found
   */
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.getProducts(page, limit);
    
  }

  @Get(':id')
  /**
   * Finds a product by id.
   * @param id the id of the product
   * @returns the product if found, or undefined if not found
   * @throws HttpException if the product is not found
   */
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
