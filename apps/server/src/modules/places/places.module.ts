import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlaceController } from './controllers/place.controller'

import { PlacesService } from './services/places.service'

import { Place } from './entities/place.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlacesService],
  exports: [PlacesService, TypeOrmModule],
})
export class PlacesModule {}
