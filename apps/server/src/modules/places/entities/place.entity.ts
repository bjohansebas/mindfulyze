import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { Think } from 'modules/thinks/entities/think.entity'
import { Color } from 'modules/users/entities/color.entity'

@Entity({
  name: 'places',
})
export class Place {
  @PrimaryGeneratedColumn('uuid', {
    name: 'place_id',
  })
  id: string
  @Column({ length: 50, name: 'name_place' })
  name: string
  @ManyToOne(
    () => Color,
    (color) => color.emotions,
    {
      nullable: false,
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'color_id', foreignKeyConstraintName: 'fk_color_pl' })
  color: Relation<Color>
  @ManyToMany(
    () => Think,
    (think) => think.places,
  )
  thinks: Relation<Think>[]
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
