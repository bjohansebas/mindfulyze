import { Test, TestingModule } from '@nestjs/testing';
import { EmotionsService } from './emotions.service';

describe('EmotionsService', () => {
  let service: EmotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmotionsService],
    }).compile();

    service = module.get<EmotionsService>(EmotionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
