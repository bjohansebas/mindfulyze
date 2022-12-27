import { Test, TestingModule } from '@nestjs/testing';
import { ThinksEmotionService } from './thinks-emotion.service';

describe('ThinksEmotionService', () => {
  let service: ThinksEmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThinksEmotionService],
    }).compile();

    service = module.get<ThinksEmotionService>(ThinksEmotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
