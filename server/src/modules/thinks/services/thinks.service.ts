import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Place } from 'modules/places/entities/place.entity';
import { User } from 'modules/users/entities/user.entity';
import { Think } from '../entities/think.entity';

import { PlacesService } from 'modules/places/services/places.service';
import { UsersService } from 'modules/users/services/users.service';

import { CreateThinkDto, UpdateThinkDto } from '../dtos/think.dto';

@Injectable()
export class ThinksService {
  constructor(
    @InjectRepository(Think) private thinkRepo: Repository<Think>,
    private userService: UsersService,
    private placeService: PlacesService,
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

  async findThinksByPlace(id: string) {
    const thinksPlace: Think[] = await this.thinkRepo.find({
      where: {
        place: { id: id },
      },
      relations: ['place'],
    });

    return thinksPlace;
  }

  async create(id_user: string, payload: CreateThinkDto) {
    const user: User = await this.userService.findAccount(id_user);

    const place: Place = await this.placeService.findById(payload.place);

    const newThink: Think = this.thinkRepo.create({
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

    return this.thinkRepo.save(think).catch((e) => e);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.thinkRepo.delete(id).catch((e) => e);
  }
}
