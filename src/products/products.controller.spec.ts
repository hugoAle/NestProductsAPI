import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
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


describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
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

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
