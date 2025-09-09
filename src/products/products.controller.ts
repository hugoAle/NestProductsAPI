import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductFilter } from './filters/get-products-filter';
import { IdValidationPipe } from 'src/common/pipes/id-validation-pipe';
import { ApiResponse , ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiQuery({name: 'page', type: 'string', description: 'Page number to get', required: false})
  @ApiQuery({name: 'pageSize', type: 'string' , description: 'Page size for the results list', required: false})
  @ApiQuery({name: 'name', type: 'string' , description: 'Filter results by \'name\' field', required: false})
  @ApiQuery({name: 'brand', type: 'string' , description: 'Filter results by \'brand\' field', required: false})
  @ApiQuery({name: 'model', type: 'string' , description: 'Filter results by \'model\' field', required: false})
  @ApiQuery({name: 'category', type: 'string' , description: 'Filter results by \'category\' field', required: false})
  @ApiQuery({name: 'price', type: 'string' , description: 'Two comma separated numbers to filter products by a price range (i.e 100,200)', required: false})
  @ApiResponse({ status: 200, description: 'List of products'})
  @Get()
  findAll(@Query() query: GetProductFilter) {
    return this.productsService.findAll(query);
  }

  @ApiParam({name: 'id', description: 'Product id to find'})
  @ApiResponse({ status: 200, description: 'Successfully found the requested product'})
  @ApiResponse({ status: 404, description: 'Product with the specified id doesnt exist'})
  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Successfully updated the requested product'})
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiParam({name: 'id', description: 'Product id to delete'})
  @ApiResponse({ status: 204, description: 'Successfully deleted the requested product'})
  @ApiResponse({ status: 404, description: 'Product with the specified id doesnt exist'})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }
}
