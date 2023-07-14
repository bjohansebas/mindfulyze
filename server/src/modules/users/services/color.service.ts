import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Color } from '../entities/color.entity';

@Injectable()
export class ColorService {
  constructor(@InjectRepository(Color) private colorRepo: Repository<Color>) {}

  async findColorById(id: string): Promise<Color> {
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

  async findColorByCode(code: string): Promise<Color> {
    const color: Color = await this.colorRepo.findOne({
      where: {
        code,
      },
    });

    if (!color) {
      throw new NotFoundException(`Color #${code} not found`);
    }

    return color;
  }
}
