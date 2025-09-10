import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeletedProduct, Product } from './entities/product.entity';


let productsRepositoryMock =  {
  save: jest.fn(),
  findOne: jest.fn()
}

let productsDeletedRepositoryMock =  {
  save: jest.fn(),
  findOne: jest.fn()
}


describe('ProductsService', () => {
  
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
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

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
