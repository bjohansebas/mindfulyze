import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlacesModule } from '../places/places.module';
import { UsersModule } from '../users/users.module';
import { EmotionsModule } from '../emotions/emotions.module';

import { Think } from './entities/think.entity';
import { ThinkEmotion } from './entities/thinkEmotion.entity';
import { Trash } from './entities/trash.entity';
import { TrashEmotion } from './entities/trashEmotion.entity';

import { TrashController } from './controllers/trash.controller';
import { ThinkController } from './controllers/think.controller';

import { ThinksService } from './services/thinks.service';
import { ThinksEmotionService } from './services/thinks-emotion.service';
import { TrashService } from './services/trash.service';
import { TrashEmotionService } from './services/trash-emotion.service';

@Module({
  imports: [
    EmotionsModule,
    forwardRef(() => PlacesModule),
    TypeOrmModule.forFeature([Think, ThinkEmotion, Trash, TrashEmotion]),
    UsersModule,
  ],
  providers: [
    ThinksService,
    ThinksEmotionService,
    TrashService,
    TrashEmotionService,
  ],
  controllers: [ThinkController, TrashController],
  exports: [ThinksService, TrashService, TypeOrmModule],
})
export class ThinksModule {}
