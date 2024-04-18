import { Test, TestingModule } from '@nestjs/testing';
import { OrdermsService } from './orderms.service';

describe('OrdermsService', () => {
  let service: OrdermsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdermsService],
    }).compile();

    service = module.get<OrdermsService>(OrdermsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
