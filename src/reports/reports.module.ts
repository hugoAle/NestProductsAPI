import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeletedProduct, Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeletedProduct,Product])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
