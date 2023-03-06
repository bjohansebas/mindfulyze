import { Test, TestingModule } from '@nestjs/testing';
import { ThinksService } from './thinks.service';

describe('ThinksService', () => {
  let service: ThinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThinksService],
    }).compile();

    service = module.get<ThinksService>(ThinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
