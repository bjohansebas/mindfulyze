import { Test, TestingModule } from '@nestjs/testing';
import { TrashEmotionService } from './trash-emotion.service';

describe('TrashEmotionService', () => {
  let service: TrashEmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashEmotionService],
    }).compile();

    service = module.get<TrashEmotionService>(TrashEmotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
