import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlacesModule } from 'modules/places/places.module';
import { UsersModule } from 'modules/users/users.module';
import { EmotionsModule } from 'modules/emotions/emotions.module';

import { Think } from './entities/think.entity';
import { ThinkEmotion } from './entities/thinkEmotion.entity';

import { ThinkController } from './controllers/think.controller';

import { ThinksService } from './services/thinks.service';
import { ThinksEmotionService } from './services/thinks-emotion.service';

@Module({
  imports: [
    EmotionsModule,
    forwardRef(() => PlacesModule),
    TypeOrmModule.forFeature([Think, ThinkEmotion]),
    UsersModule,
  ],
  providers: [ThinksService, ThinksEmotionService],
  controllers: [ThinkController],
  exports: [ThinksService, TypeOrmModule],
})
export class ThinksModule {}
