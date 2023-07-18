import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

import { Emotion } from 'modules/emotions/entities/emotion.entity';
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
  think: Relation<Think>;
  @ManyToOne(() => Emotion, (emotion) => emotion.thinks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'emotion_id',
    foreignKeyConstraintName: 'fk_emotion_thiemo',
  })
  emotion: Relation<Emotion>;
  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
