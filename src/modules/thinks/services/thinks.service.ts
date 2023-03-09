import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Place } from '../../places/entities/place.entity';
import { User } from '../../users/entities/user.entity';
import { Think } from '../entities/think.entity';

import { PlacesService } from '../../places/services/places.service';
import { UsersService } from '../../users/services/users.service';
import { ThinksEmotionService } from './thinks-emotion.service';
import { TrashService } from './trash.service';

import { AddEmotionsDto } from '../dtos/think-emotion.dto';
import { CreateThinkDto, UpdateThinkDto } from '../dtos/think.dto';

@Injectable()
export class ThinksService {
  constructor(
    @InjectRepository(Think) private thinkRepo: Repository<Think>,
    private userService: UsersService,
    private placeService: PlacesService,
    private trashService: TrashService,
    private thinkEmotionService: ThinksEmotionService,
  ) {}

  async findById(id: string): Promise<Think> {
    const think: Think = await this.thinkRepo.findOne({
      where: {
        id,
      },
      relations: ['emotions.emotion', 'user', 'place'],
    });

    if (!think) {
      throw new NotFoundException(`Think #${id} not found`);
    }

    return think;
  }

  async create(id_user: string, payload: CreateThinkDto) {
    const user: User = await this.userService.findAccount(id_user);

    const place: Place = await this.placeService.findById(payload.place);

    const newThink: Think = this.thinkRepo.create({
      isArchive: false,
      place: place,
      text: payload.text,
      user: user,
    });

    const isThink = this.thinkRepo.save(newThink);

    return isThink;
  }

  async update(id: string, payload: UpdateThinkDto) {
    const think: Think = await this.findById(id);

    if (payload.text) {
      think.text = payload.text;
    }

    think.isArchive = payload.isArchive;

    return this.thinkRepo.save(think).catch((e) => e);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.thinkRepo.delete(id).catch((e) => e);
  }

  async moveToTrash(id: string) {
    return await this.trashService.create(id);
  }

  async removeOfTrash(id: string) {
    const trash = await this.trashService.findById(id);

    const payload = this.thinkRepo.create({
      id: trash.id,
      text: trash.text,
      user: trash.user,
      place: trash.place,
      isArchive: false,
      createdAt: trash.createdAt,
      updatedAt: trash.updatedAt,
    });

    const isThink = await this.thinkRepo.save(payload);

    const emotionsIds: string[] = trash.emotions.map((value) => {
      return value.emotion.id;
    });

    const newEmotions = new AddEmotionsDto();
    newEmotions.emotions = emotionsIds;

    await this.thinkEmotionService.registerEmotion(id, newEmotions);

    await this.trashService.remove(id);

    return isThink;
  }
}
