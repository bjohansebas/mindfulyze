import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Emotion } from '../../emotions/entities/emotion.entity';
import { Place } from '../../places/entities/place.entity';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'trash_thinks',
})
export class Trash {
  @PrimaryGeneratedColumn('uuid', {
    name: 'trash_th_id',
  })
  id: string;
  @Column({ type: 'varchar', name: 'text_think' })
  text: string;
  @ManyToOne(() => Place, (place) => place.thinks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'place_id', foreignKeyConstraintName: 'fk_place_ts' })
  place: Place;
  @ManyToOne(() => User, (user) => user.places, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_ts' })
  user: User;
  @ManyToMany(() => Emotion, (emotion) => emotion.thinks)
  @JoinTable({
    name: 'think_trash_emotions',
    joinColumn: {
      name: 'trash_th_id',
      foreignKeyConstraintName: 'fk_think_trash_thiemo',
    },
    inverseJoinColumn: {
      name: 'emotion_id',
      foreignKeyConstraintName: 'fk_emotion_thiemo_trash',
    },
  })
  emotions: Emotion[];
  @CreateDateColumn({ type: 'date', name: 'date_start' })
  dateStart: Date;
  @Column({ type: 'date', name: 'date_end' })
  dateEnd: Date;
  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
