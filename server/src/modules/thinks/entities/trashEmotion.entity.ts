import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { Emotion } from '../../emotions/entities/emotion.entity';
import { Think } from './think.entity';
import { Trash } from './trash.entity';

@Entity({
  name: 'think_trash_emotions',
})
export class TrashEmotion {
  @PrimaryGeneratedColumn('uuid', {
    name: 'think_trash_emotion_id',
  })
  id: string;
  @ManyToOne(() => Trash, (trash) => trash.emotions, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'trash_th_id',
    foreignKeyConstraintName: 'fk_think_trash_thiemo',
  })
  think: Think;
  @ManyToOne(() => Emotion, (emotion) => emotion.thinks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'emotion_id',
    foreignKeyConstraintName: 'fk_emotion_thiemo_trash',
  })
  emotion: Emotion;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
