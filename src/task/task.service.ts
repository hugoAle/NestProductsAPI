/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios from 'axios';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';


const INTERVAL_FRECUENCY = 1000 * 60 * 60; //millisconds * seconds * minutes

@Injectable()
export class TasksService {

    private readonly logger = new Logger(TasksService.name);

   constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private configService: ConfigService
   ) {}

  private async insertProducts(dataToInsert: CreateProductDto[]) {

    try{

      const qryResult = await this.productsRepository.save(dataToInsert);
      const totalInserted = qryResult.length;

      this.logger.debug(`DATA INSERTED SUCESSFULLY: ${totalInserted} products added to DB`);

    }catch(err){
      let message = '';
      
      if(err instanceof Error)
        message = `DATABASE ERROR: ${err?.message || 'unknown error'}`;
      
      this.logger.error(message);
    }

  }

  private async getDataForProducts() {
    
    let allItems: CreateProductDto[] = [];

    try{
        
      const space_id = this.configService.get('CONTENTFUL_SPACE_ID');
      const env_id = this.configService.get('CONTENTFUL_ENVIRONMENT');
      const token_id = this.configService.get('CONTENTFUL_ACCESS_TOKEN');
      const content_type =  this.configService.get('CONTENTFUL_CONTENT_TYPE');
      
      const url = `https://cdn.contentful.com/spaces/${space_id}/environments/${env_id}/entries?access_token=${token_id}&content_type=${content_type}`;

      const qryResponse =  await axios.get(url);
      allItems = qryResponse.data.items.map(i=>i.fields);

    }catch(err: unknown){
      let message = '';
      
      if(err instanceof Error)
        message = `DATA ERROR: ${err?.message || "unknown error"}`;
      
      this.logger.error(message);
    }

    return allItems;
  }

  @Interval(INTERVAL_FRECUENCY)
  async handleGetProductsData() {
   
    this.logger.debug('--- RETRIEVING EXTERNAL DATA: PRODUCTS ---');
    const dataToInsert = await this.getDataForProducts();
    if(dataToInsert.length > 0)
      await this.insertProducts(dataToInsert);

  }



}