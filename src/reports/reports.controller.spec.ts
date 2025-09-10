import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeletedProduct, Product } from '../products/entities/product.entity';
import { JwtService } from '@nestjs/jwt';

let productsRepositoryMock =  {
  save: jest.fn(),
  findOne: jest.fn()
}

let productsDeletedRepositoryMock =  {
  save: jest.fn(),
  findOne: jest.fn()
}

describe('ReportsController', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Product),
          useValue: productsRepositoryMock
        },
        {
          provide: getRepositoryToken(DeletedProduct),
          useValue: productsDeletedRepositoryMock
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn()
          },
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
