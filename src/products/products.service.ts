import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Between, FindManyOptions, Raw, Repository } from 'typeorm';
import { GetProductFilter } from './filters/get-products-filter';

@Injectable()
export class ProductsService {

   constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  
  async create(createProductDto: CreateProductDto) {

    const newItem = await this.productsRepository.save({
      ...createProductDto,
    });

    return {
      success: true,
      data: newItem
    };
  }

  async findAll(queryParams: GetProductFilter) {
   
    const { page, pageSize, name, brand, model, category, price } = queryParams;

    //pagination
    const _page = page ? page : 1;
    const limit = pageSize ? pageSize : 5;
    const skip = ( _page-1) * limit;

    const queryOptions: FindManyOptions<Product> = {
      order:{
       id: 'DESC'
      },
      take: limit,
      skip: skip
    }

    if(name){
      queryOptions.where = {
       name: Raw(alias => `LOWER(${alias}) Like '%${name}%'`),
       //name: name
      }
    }

    if(brand){
      queryOptions.where = {
        ...queryOptions.where,
        brand: Raw(alias => `LOWER(${alias}) Like '%${brand}%'`),
      }
    }

    if(model){
      queryOptions.where = {
        ...queryOptions.where,
        model: Raw(alias => `LOWER(${alias}) Like '%${model}%'`),
      }
    }

    if(category){
      queryOptions.where = {
        ...queryOptions.where,
        category: Raw(alias => `LOWER(${alias}) Like '%${category}%'`),
      }
    }

    if(price){
     if(price.length != 2)
      throw new BadRequestException({success: false, message: 'To filter by price please specify a 2 numbers range'})

      queryOptions.where = {
        ...queryOptions.where,
        price: Between(price[0],price[1])
      }
    }

    const allItems = await this.productsRepository.find(queryOptions);

    return {
      success: true,
      data: allItems
    };
  }

  async findOne(id: number) {
    
    const oneItem = await this.productsRepository.findOne({
      where: {
        id: id
      },
    });

    if(!oneItem)
      throw new NotFoundException({
        success: false,
        message: 'Product not found'
      });

    return {
      success: true,
      data: oneItem
    };
    
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const findItem = await this.productsRepository.findOneBy({
      id: id
    });

    if(!findItem)
      throw new NotFoundException({
        success: false,
        message: 'Product not found'
      });

    const updatedQry = await this.productsRepository.update(
    {
      id: id
    },
    {
      name: updateProductDto?.name || findItem.name,
      price: updateProductDto?.price || findItem.price,
      brand: updateProductDto?.brand || findItem.brand,
      model: updateProductDto?.model || findItem.model,
      category: updateProductDto?.category || findItem.category,
      color: updateProductDto?.color || findItem.color,
      currency: updateProductDto?.currency || findItem.currency,
      stock: updateProductDto?.stock || findItem.stock
    });

    if(updatedQry.affected && updatedQry?.affected < 1){
      throw new InternalServerErrorException({
        success: false,
        message: 'Unable to complete update operation'
      });
    }

    return {
      success: true,
      data: 'Update OK'
    };
    
  }

  async remove(id: number) {
    
    const findItem = await this.productsRepository.findOneBy({
      id: id
    });

    if(!findItem)
      throw new NotFoundException({
        success: false,
        message: 'Product not found'
      });

    await this.productsRepository.delete({
      id: id
    });

    return {
      success: true,
    };

  }
}
