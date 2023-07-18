import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
} from 'typeorm';

import { Emotion } from 'modules/emotions/entities/emotion.entity';
import { Exclude } from 'class-transformer';

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
  @OneToMany(() => Emotion, (emotion) => emotion.color)
  emotions: Relation<Emotion>[];
  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
