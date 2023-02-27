import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Color } from '../../users/entities/color.entity';
import { Think } from '../../thinks/entities/think.entity';
import { Trash } from '../../thinks/entities/trash.entity';

@Entity({
  name: 'emotions',
})
export class Emotion {
  @PrimaryGeneratedColumn('uuid', {
    name: 'emotion_id',
  })
  id: string;
  @Column({ unique: true, length: 20, name: 'name_emotion' })
  name: string;
  @Column({
    type: 'varchar',
    length: 8,
    name: 'type_emotion',
    default: 'Negative',
  })
  type: string;
  @ManyToOne(() => Color, (color) => color.emotions, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'color_id', foreignKeyConstraintName: 'fk_color_em' })
  color: Color;
  @OneToMany(() => Think, (think) => think.emotions)
  thinks: Think[];
  @ManyToMany(() => Trash, (trash) => trash.emotions)
  trash: Trash[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
