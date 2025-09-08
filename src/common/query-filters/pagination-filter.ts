import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationFilter { 
  
  @IsOptional()
  @IsNumberString({},{message: 'Page must be a number'})
  page?: number

  @IsOptional()
  @IsNumberString({},{message: 'Page size must be a number'})
  pageSize?: number

}