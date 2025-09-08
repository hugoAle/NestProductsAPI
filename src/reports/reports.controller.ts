import { Controller, Get, Param, BadRequestException, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { DateFilter } from 'src/common/query-filters/date-filter';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':name')
  reportByName( @Param('name') reportName: string, @Query() query: DateFilter) {
   
    if(reportName === 'deletedProducts'){
      return this.reportsService.getDeletedReport();
    }else if(reportName === 'non-deletedProducts'){
       return this.reportsService.getNonDeletedReport(query);
    }
   
    throw new BadRequestException({
      success: false, 
      message: 'Report doesn\'t not exist'
    })

  }
  
}
