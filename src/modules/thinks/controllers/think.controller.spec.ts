import { Test, TestingModule } from '@nestjs/testing';
import { ThinkController } from './think.controller';

describe('ThinkController', () => {
  let controller: ThinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThinkController],
    }).compile();

    controller = module.get<ThinkController>(ThinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
