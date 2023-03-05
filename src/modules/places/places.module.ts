import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';

import { PlaceController } from './controllers/place.controller';

import { Place } from './entities/place.entity';

import { PlacesService } from './services/places.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlacesService],
  exports: [PlacesService, TypeOrmModule],
})
export class PlacesModule {}
