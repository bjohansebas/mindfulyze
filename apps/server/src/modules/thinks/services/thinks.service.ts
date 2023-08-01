import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { Place } from 'modules/places/entities/place.entity'
import { User } from 'modules/users/entities/user.entity'
import { Think } from '../entities/think.entity'

import { UsersService } from 'modules/users/services/users.service'

import { Emotion } from '@/modules/emotions/entities/emotion.entity'
import { CreateThinkDto, UpdateEmotionsDto, UpdateThinkDto } from '../dtos/think.dto'

@Injectable()
export class ThinksService {
  constructor(
    @InjectRepository(Think) private thinkRepo: Repository<Think>,
    @InjectRepository(Emotion) private emotionsRepo: Repository<Emotion>,
    @InjectRepository(Place) private placeRepo: Repository<Place>,
    private userService: UsersService,
  ) {}

  async findById(id: string): Promise<Think> {
    const think: Think = await this.thinkRepo.findOne({
      where: {
        id,
      },
      relations: ['emotions', 'user', 'places'],
    })

    if (!think) {
      throw new NotFoundException(`Think #${id} not found`)
    }

    return think
  }

  async create(idUser: string, payload: CreateThinkDto) {
    const user: User = await this.userService.findAccount(idUser)

    const newThink: Think = this.thinkRepo.create({
      text: payload.text,
      user: user,
    })

    if (payload?.places?.length > 0) {
      const places = await this.placeRepo.findBy({ id: In(payload.places) })
      newThink.places = places
    }

    if (payload?.emotions?.length > 0) {
      const emotions = await this.emotionsRepo.findBy({ id: In(payload.emotions) })
      newThink.emotions = emotions
    }

    const isThink = this.thinkRepo.save(newThink)

    return isThink
  }

  async update(id: string, payload: UpdateThinkDto) {
    const think: Think = await this.findById(id)

    if (payload.text) {
      think.text = payload.text
    }

    if (payload?.places?.length > 0) {
      const places = await this.placeRepo.findBy({ id: In(payload.places) })
      think.places = places
    }

    if (payload?.emotions?.length > 0) {
      const emotions = await this.emotionsRepo.findBy({ id: In(payload.emotions) })
      think.emotions = emotions
    }

    return this.thinkRepo.save(think).catch((e) => e)
  }

  async updateEmotion(idThink: string, payload: UpdateEmotionsDto) {
    const think: Think = await this.findById(idThink)
    let emotions = think.emotions

    if (payload.add) {
      const addEmotions: Emotion[] = await this.emotionsRepo.findBy({
        id: In(payload.add),
      })

      if (addEmotions.length > 0) {
        emotions = [...emotions, ...addEmotions]
      }
    }

    if (payload.remove) {
      emotions = emotions.filter((emotion) => !payload.remove.includes(emotion.id))
    }

    think.emotions = emotions

    return this.thinkRepo.save(think).catch((e) => e)
  }

  async remove(id: string) {
    await this.findById(id)

    return this.thinkRepo.delete(id).catch((e) => e)
  }
}
