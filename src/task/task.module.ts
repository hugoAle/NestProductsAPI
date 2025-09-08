import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  providers: [TasksService],
})

export class TaskModule {}
