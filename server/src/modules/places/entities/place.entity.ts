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

import { Color } from '../../users/entities/color.entity';
import { Think } from '../../thinks/entities/think.entity';
import { User } from '../../users/entities/user.entity';
import { Trash } from '../../thinks/entities/trash.entity';

@Entity({
  name: 'places',
})
export class Place {
  @PrimaryGeneratedColumn('uuid', {
    name: 'place_id',
  })
  id: string;
  @Column({ length: 50, name: 'name_place' })
  name: string;
  @ManyToOne(() => Color, (color) => color.emotions, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'color_id', foreignKeyConstraintName: 'fk_color_pl' })
  color: Color;
  @ManyToOne(() => User, (user) => user.places, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_pl' })
  user: User;
  @OneToMany(() => Think, (think) => think.place)
  thinks: Think[];
  @OneToMany(() => Trash, (trash) => trash.place)
  trashes: Trash[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}