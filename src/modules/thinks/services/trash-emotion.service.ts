import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Think } from '../entities/think.entity';
import { Emotion } from 'src/modules/emotions/entities/emotion.entity';
import { TrashEmotion } from '../entities/trashEmotion.entity';

import { ThinksService } from './thinks.service';
import { TrashService } from './trash.service';

@Injectable()
export class TrashEmotionService {
  constructor(
    @InjectRepository(TrashEmotion)
    private trashEmotionRepo: Repository<TrashEmotion>,
    @InjectRepository(Emotion) private emotionRepo: Repository<Emotion>,
    @Inject(forwardRef(() => TrashService))
    private trashService: TrashService,
    @Inject(forwardRef(() => ThinksService))
    private thinkService: ThinksService,
  ) {}

  async registerEmotion(id_think: string) {
    const think: Think = await this.thinkService.findById(id_think);

    const emotionsIds = think.emotions.map((value) => {
      return value.emotion.id;
    });

    const emotions: Emotion[] = await this.emotionRepo.findBy({
      id: In(emotionsIds),
    });

    for (const emotion of emotions) {
      const newRelation: TrashEmotion = this.trashEmotionRepo.create({
        think: think,
        emotion: emotion,
        createdAt: emotion.createdAt,
      });

      await this.trashEmotionRepo.save(newRelation);
    }

    return this.trashService.findById(id_think);
  }
}
