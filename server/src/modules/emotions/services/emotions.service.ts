import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Emotion } from '../entities/emotion.entity'

@Injectable()
export class EmotionsService {
  constructor(
    @InjectRepository(Emotion) private emotionRepo: Repository<Emotion>,
  ) {}

  async findAll(): Promise<Emotion[]> {
    return this.emotionRepo.find()
  }

  async findById(id: string): Promise<Emotion> {
    const emotion: Emotion = await this.emotionRepo.findOne({
      where: {
        id,
      },
      relations: ['color'],
    })

    if (!emotion) {
      throw new NotFoundException(`Emotion #${id} not found`)
    }

    return emotion
  }
}
