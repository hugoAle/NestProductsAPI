import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateProductDto {

  @IsString()
  @IsOptional()
  sku?:string

  @IsString()
  @IsNotEmpty({message: 'Name cannot be empty'})
  name: string

  @IsString()
  @IsNotEmpty({message: 'Brand cannot be empty'})
  brand: string

  @IsString()
  @IsNotEmpty({message: 'Model cannot be empty'})
  model: string

  @IsString()
  @IsNotEmpty({message: 'Category cannot be empty'})
  category: string

  @IsString()
  @IsOptional()
  color?: string

  @IsString()
  @IsOptional()
  currency?: string

  @IsInt({message: 'Stock not valid'})
  @Min(0, {message: 'Stock must be greater than or equal to 0'})
  stock?: number

  @IsNumber({maxDecimalPlaces: 2}, {message: 'Price not valid'})
  @Min(1,{message: 'Price must be greater than 0'})
  @IsNotEmpty({message: 'Price cannot be empty'})
  price: number

}
