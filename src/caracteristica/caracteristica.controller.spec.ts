import { Test, TestingModule } from '@nestjs/testing';
import { CaracteristicaController } from './caracteristica.controller';
import { CaracteristicaService } from './caracteristica.service';

describe('CaracteristicaController', () => {
  let controller: CaracteristicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaracteristicaController],
      providers: [CaracteristicaService],
    }).compile();

    controller = module.get<CaracteristicaController>(CaracteristicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
