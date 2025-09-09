import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateProductDto {

  @ApiProperty({ description: 'SKU field', required: false})
  @IsString()
  @IsOptional()
  sku?:string

  @ApiProperty({ description: 'Name of the product'})
  @IsString()
  @IsNotEmpty({message: 'Name cannot be empty'})
  name: string

  @ApiProperty({ description: 'Product brand'})
  @IsString()
  brand: string

  @ApiProperty({ description: 'Product model'})
  @IsString()
  @IsNotEmpty({message: 'Model cannot be empty'})
  model: string

  @ApiProperty({ description: 'Product category'})
  @IsString()
  @IsNotEmpty({message: 'Category cannot be empty'})
  category: string

  @ApiProperty({ description: 'Product color', required:false})
  @IsString()
  @IsOptional()
  color?: string

  @ApiProperty({ description: 'Product current, default to USD', required: false})
  @IsString()
  @IsOptional()
  currency?: string

  @ApiProperty({ description: 'Product stock, must be a number'})
  @IsInt({message: 'Stock not valid'})
  @Min(0, {message: 'Stock must be greater than or equal to 0'})
  stock?: number

  @ApiProperty({ description: 'Product price'})
  @IsNumber({maxDecimalPlaces: 2}, {message: 'Price not valid'})
  @Min(1,{message: 'Price must be greater than 0'})
  @IsNotEmpty({message: 'Price cannot be empty'})
  price: number

}
