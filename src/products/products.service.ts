import { Injectable,HttpException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>  
  ){}

  /**
   * Create a new product in the database.
   * @param createProductDto the data to be inserted in the database
   * @returns the newly created product, or undefined if an error occurs
   * @throws HttpException if the create operation fails
   */
 async create(createProductDto: CreateProductDto): Promise<Product | undefined> {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  /**
   * Finds a product by id.
   * @param id the id of the product
   * @returns the product if found, or undefined if not found
   * @throws HttpException if the product is not found
   */
   async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
