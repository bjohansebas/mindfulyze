import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Emotion } from '../../emotions/entities/emotion.entity';
import { Place } from '../../places/entities/place.entity';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'thinks',
})
export class Think {
  @PrimaryGeneratedColumn('uuid', {
    name: 'think_id',
  })
  id: string;
  @Column({ type: 'varchar', name: 'text_think' })
  text: string;
  @Column({ type: 'boolean', name: 'is_archive' })
  isArchive: boolean;
  @ManyToOne(() => Place, (place) => place.thinks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'place_id', foreignKeyConstraintName: 'fk_place_tk' })
  place: Place;
  @ManyToOne(() => User, (user) => user.places, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_tk' })
  user: User;
  @ManyToMany(() => Emotion, (emotion) => emotion.thinks)
  @JoinTable({
    name: 'think_emotions',
    joinColumn: {
      name: 'think_id',
      foreignKeyConstraintName: 'fk_think_thiemo',
    },
    inverseJoinColumn: {
      name: 'emotion_id',
      foreignKeyConstraintName: 'fk_emotion_thiemo',
    },
  })
  emotions: Emotion[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
