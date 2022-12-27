import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Think } from '../../thinks/entities/think.entity';

@Injectable()
export class StatisticService {
  constructor(@InjectRepository(Think) private thinkRepo: Repository<Think>) {}

  async getAllEmotionByThinks(userId: string) {
    const thinkPositives: Think[] = await this.thinkRepo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['emotions.emotion', 'emotions.emotion.color'],
    });

    const emotions = thinkPositives.flatMap((value) => {
      return value.emotions;
    });

    return emotions || [];
  }

  async getPositiveEmotionByThinks(userId: string) {
    const thinkPositives: Think[] = await this.thinkRepo.find({
      where: {
        user: {
          id: userId,
        },
        emotions: {
          emotion: {
            type: 'Positive',
          },
        },
      },
      relations: ['emotions.emotion', 'emotions.emotion.color'],
    });

    const emotions = thinkPositives.flatMap((value) => {
      return value.emotions;
    });

    return emotions || [];
  }

  async getNegativeEmotionByThinks(userId: string) {
    const thinkPositives: Think[] = await this.thinkRepo.find({
      where: {
        user: {
          id: userId,
        },
        emotions: {
          emotion: {
            type: 'Negative',
          },
        },
      },
      relations: ['emotions.emotion', 'emotions.emotion.color'],
    });

    const emotions = thinkPositives.flatMap((value) => {
      return value.emotions;
    });

    return emotions || [];
  }
}
