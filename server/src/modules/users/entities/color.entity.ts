import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Emotion } from 'modules/emotions/entities/emotion.entity';
import { User } from './user.entity';

@Entity({
  name: 'colors',
})
export class Color {
  @PrimaryGeneratedColumn('uuid', {
    name: 'color_id',
  })
  id: string;
  @Column({ type: 'varchar', name: 'code_color', length: 6 })
  code: string;
  @ManyToOne(() => User, (user) => user.colors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_co' })
  user: User;
  @OneToMany(() => Emotion, (emotion) => emotion.color)
  emotions: Emotion[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
