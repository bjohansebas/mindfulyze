import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';

import { Trash } from '../entities/trash.entity';

import { ThinksService } from './thinks.service';
import { TrashEmotionService } from './trash-emotion.service';

@Injectable()
export class TrashService {
  constructor(
    @InjectRepository(Trash) private trashRepo: Repository<Trash>,
    @Inject(forwardRef(() => ThinksService))
    private thinkService: ThinksService,
    private trashEmotionService: TrashEmotionService,
  ) {}

  async findById(id: string): Promise<Trash> {
    const trash: Trash = await this.trashRepo.findOne({
      where: {
        id,
      },
      relations: ['emotions.emotion', 'user', 'place'],
    });

    if (!trash) {
      throw new NotFoundException(`Trash #${id} not found`);
    }

    return trash;
  }

  async create(id_think: string) {
    const think = await this.thinkService.findById(id_think);

    const now = dayjs();
    const start: string = now.format('YYYY-MM-DD');

    const end: string = dayjs(
      new Date(now.year(), now.month() + 1, now.day()),
    ).format('YYYY-MM-DD');

    const payload: Trash = this.trashRepo.create({
      createdAt: think.createdAt,
      updatedAt: think.updatedAt,
      id: think.id,
      text: think.text,
      place: think.place,
      user: think.user,
      dateStart: start,
      dateEnd: end,
    });

    await this.trashRepo.save(payload);

    await this.trashEmotionService.registerEmotion(id_think);

    await this.thinkService.remove(id_think);

    return this.findById(id_think);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.trashRepo.delete(id).catch((e) => e);
  }
}
