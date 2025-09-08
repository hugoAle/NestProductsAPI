import { Transform } from 'class-transformer';
import {  IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationFilter } from 'src/common/filters/pagination-filter';

export class GetProductFilter extends PaginationFilter { 

  @IsOptional()
  @IsString({message: 'The query parameter <name> must a string'})
  name?: string

  @IsOptional()
  @IsString({message: 'The query parameter <brand> must a string'})
  brand?: string

  @IsOptional()
  @IsString({message: 'The query parameter <brand> must a string'})
  model?: string

  @IsOptional()
  @IsString({message: 'The query parameter <brand> must a string'})
  category?: string

  @IsOptional()
  @Transform((params) => String(params.value).split(',').map(Number))
  @IsInt({ each: true , message: 'The query parameter <price> must be a comma separated list of numbers' })
  price?: number[]

}
