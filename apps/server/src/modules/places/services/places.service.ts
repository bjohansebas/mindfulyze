import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Place } from '../entities/place.entity'

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placeRepo: Repository<Place>,
  ) {}

  async findAll(): Promise<Place[]> {
    const places: Place[] = await this.placeRepo.find({
      relations: ['color'],
    })

    return places
  }

  async findById(id: string): Promise<Place> {
    const place: Place = await this.placeRepo.findOne({
      where: {
        id,
      },
      relations: ['color'],
    })

    if (!place) {
      throw new NotFoundException(`Place #${id} not found`)
    }

    return place
  }
}
