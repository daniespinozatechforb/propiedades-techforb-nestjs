import { Test, TestingModule } from '@nestjs/testing';
import { CaracteristicaService } from './caracteristica.service';

describe('CaracteristicaService', () => {
  let service: CaracteristicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaracteristicaService],
    }).compile();

    service = module.get<CaracteristicaService>(CaracteristicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
