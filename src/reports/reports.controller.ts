import { Controller, Get, Param, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { DateFilter } from '../common/query-filters/date-filter';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiParam, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiParam({name: 'name', description: 'Name of the report: {deletedProducts}, {non-deletedProducts}, {categoryDistribution}'})
  @ApiQuery({name: 'startDate', type: 'string', description: 'Apply only to {non-deletedProducts}. Filter report by a date range.', required: false})
  @ApiQuery({name: 'endDate', type: 'string', description: 'Apply only to {non-deletedProducts}. Filter report by a date range.', required: false})
  @ApiResponse({ status: 200, description: 'Successfully found the requested report'})
  @ApiBearerAuth()
  @Get(':name')
  @UseGuards(AuthGuard)
  reportByName( 
    @Param('name') reportName: string, 
    @Query() query: DateFilter){
   
    if(reportName === 'deletedProducts'){
      return this.reportsService.getDeletedReport();
    }else if(reportName === 'non-deletedProducts'){
       return this.reportsService.getNonDeletedReport(query);
    }else if(reportName === 'categoryDistribution'){
       return this.reportsService.geCategoriesDistribution();
    }
   
    throw new BadRequestException({
      success: false, 
      message: 'Report doesn\'t not exist'
    })

  }
  
}
