import { Test, TestingModule } from '@nestjs/testing';
import { OrdermsController } from './orderms.controller';
import { OrdermsService } from './orderms.service';

describe('OrdermsController', () => {
  let controller: OrdermsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdermsController],
      providers: [OrdermsService],
    }).compile();

    controller = module.get<OrdermsController>(OrdermsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
