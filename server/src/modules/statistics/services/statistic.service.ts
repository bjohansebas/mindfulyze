import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Think } from 'modules/thinks/entities/think.entity'

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
      relations: ['emotions', 'emotions.color'],
    })

    const emotions = thinkPositives.flatMap((value) => {
      return value.emotions
    })

    return emotions || []
  }

  async getPositiveEmotionByThinks(userId: string) {
    const thinkPositives: Think[] = await this.thinkRepo.find({
      where: {
        user: {
          id: userId,
        },
        emotions: {
          type: 'Positive',
        },
      },
      relations: ['emotions', 'emotions.color'],
    })

    const emotions = thinkPositives.flatMap((value) => {
      return value.emotions
    })

    return emotions || []
  }

  async getNegativeEmotionByThinks(userId: string) {
    const thinkPositives: Think[] = await this.thinkRepo.find({
      where: {
        user: {
          id: userId,
        },
        emotions: {
          type: 'Negative',
        },
      },
      relations: ['emotions', 'emotions.color'],
    })

    const emotions = thinkPositives.flatMap((value) => {
      return value.emotions
    })

    return emotions || []
  }
}
