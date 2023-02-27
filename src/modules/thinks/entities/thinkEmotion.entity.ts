import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Emotion } from '../../emotions/entities/emotion.entity';
import { Think } from './think.entity';

@Entity({
  name: 'think_emotions',
})
export class ThinkEmotion {
  @PrimaryGeneratedColumn('uuid', {
    name: 'think_emotion_id',
  })
  id: string;
  @ManyToOne(() => Think, (think) => think.emotions, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'think_id',
    foreignKeyConstraintName: 'fk_think_thiemo',
  })
  think: Think;
  @ManyToOne(() => Emotion, (emotion) => emotion.thinks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'emotion_id',
    foreignKeyConstraintName: 'fk_emotion_thiemo',
  })
  emotion: Emotion;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
