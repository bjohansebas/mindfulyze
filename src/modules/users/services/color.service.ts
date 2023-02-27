import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateColorDto, UpdateColorDto } from '../dtos/color.dto';

import { Color } from '../entities/color.entity';

import { UsersService } from './users.service';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color) private colorRepo: Repository<Color>,
    private userService: UsersService,
  ) {}

  async findColor(id: string): Promise<Color> {
    const color: Color = await this.colorRepo.findOne({
      where: {
        id,
      },
    });

    if (!color) {
      throw new NotFoundException(`Color #${id} not found`);
    }

    return color;
  }

  async createColor(id_user: string, payload: CreateColorDto) {
    const user = await this.userService.findAccount(id_user);

    const newColor = this.colorRepo.create(payload);

    newColor.user = user;

    const isColor = this.colorRepo.save(newColor);

    return isColor;
  }

  async updateColor(id: string, payload: UpdateColorDto): Promise<Color> {
    const existColor: Color = await this.findColor(id);

    this.colorRepo.merge(existColor, payload);

    return this.colorRepo.save(existColor).catch((e) => e);
  }

  async removeColor(id: string) {
    await this.findColor(id);

    return this.colorRepo.delete(id).catch((e) => e);
  }
}
