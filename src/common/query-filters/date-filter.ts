import { IsOptional } from 'class-validator';

export class DateFilter { 
  
  @IsOptional()
  startDate?: string

  @IsOptional()
  endDate?: string

}