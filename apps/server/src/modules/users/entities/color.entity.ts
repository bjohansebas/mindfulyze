import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { Emotion } from 'modules/emotions/entities/emotion.entity'

@Entity({
  name: 'colors',
})
export class Color {
  @Exclude()
  @PrimaryGeneratedColumn('uuid', {
    name: 'color_id',
  })
  id: string
  @Column({ type: 'varchar', name: 'code_color', length: 6 })
  code: string
  @OneToMany(
    () => Emotion,
    (emotion) => emotion.color,
  )
  emotions: Relation<Emotion>[]
  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date
  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
