import { BadRequestException, Injectable } from '@nestjs/common';
import { DeletedProduct, Product } from 'src/products/entities/product.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DateFilter } from 'src/common/query-filters/date-filter';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(DeletedProduct)
    private readonly deletedRepository: Repository<DeletedProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getDeletedReport() {

    const totalDeleted = await this.deletedRepository.count({});
    const totalActive = await this.productRepository.count({});
    const totalProducts = totalActive + totalDeleted;

    const percentageDeleted = (totalDeleted/totalProducts) * 100

    return{
      success: true,
      message: `% deleted products: ${percentageDeleted.toFixed(2)}`
    }
  }

  async getNonDeletedReport(queryParams: DateFilter) {
    
    const { startDate, endDate } = queryParams;

    const qryOptionsProducts: FindManyOptions<Product> = {
      order:{
        id: 'DESC'
      }
    }

    const qryOptionsDeleted: FindManyOptions<DeletedProduct> = {
      order:{
        id: 'DESC'
      }
    }

    if(startDate && endDate){

      const _startDate = parseISO(startDate);
      const _endDate = parseISO(endDate);

      if(!isValid(_startDate)|| !isValid(_endDate) )
        throw new BadRequestException({
          success: false, 
          message: 'Date range is not valid'
        })
    
        qryOptionsProducts.where = {
          createdAt: Between( startOfDay(_startDate), endOfDay(_endDate) )
        }

        qryOptionsDeleted.where = {
          deletedOn: Between( startOfDay(_startDate), endOfDay(_endDate) )
        }
    }

    const totalActive = await this.productRepository.count(qryOptionsProducts);
    const totalDeleted = await this.deletedRepository.count(qryOptionsDeleted);
    const totalProducts = totalActive + totalDeleted;

    const percentageNonDeleted = (totalActive/totalProducts) * 100
    
    return{
      success: true,
      message: `% non-deleted products: ${percentageNonDeleted.toFixed(2)}`
    }
  }

}

