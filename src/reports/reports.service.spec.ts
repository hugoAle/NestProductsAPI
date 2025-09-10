import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeletedProduct, Product } from '../products/entities/product.entity';

let productsRepositoryMock =  {
  save: jest.fn(),
  findOne: jest.fn()
}

let productsDeletedRepositoryMock =  {
  save: jest.fn(),
  findOne: jest.fn()
}

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
