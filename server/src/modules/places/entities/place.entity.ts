import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { Color } from 'modules/users/entities/color.entity';
import { Think } from 'modules/thinks/entities/think.entity';
import { User } from 'modules/users/entities/user.entity';

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
  color: Relation<Color>;
  @ManyToOne(() => User, (user) => user.places, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_pl' })
  user: Relation<User>;
  @OneToMany(() => Think, (think) => think.place)
  thinks: Relation<Think>[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
