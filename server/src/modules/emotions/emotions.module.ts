import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Emotion } from './entities/emotion.entity';

import { EmotionsService } from './services/emotions.service';

import { EmotionController } from './controllers/emotion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion])],
  providers: [EmotionsService],
  controllers: [EmotionController],
  exports: [EmotionsService, TypeOrmModule],
})
export class EmotionsModule {}
