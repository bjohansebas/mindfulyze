import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThinksModule } from 'modules/thinks/thinks.module';
import { UsersModule } from 'modules/users/users.module';

import { PlaceController } from './controllers/place.controller';

import { PlacesService } from './services/places.service';

import { Place } from './entities/place.entity';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => ThinksModule),
    TypeOrmModule.forFeature([Place]),
  ],
  controllers: [PlaceController],
  providers: [PlacesService],
  exports: [PlacesService, TypeOrmModule],
})
export class PlacesModule {}
