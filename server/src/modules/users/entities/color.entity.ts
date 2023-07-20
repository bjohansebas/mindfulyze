import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn,
} from 'typeorm'

import { Exclude } from 'class-transformer'
import { Emotion } from 'modules/emotions/entities/emotion.entity'

@Entity({
	name: 'colors',
})
export class Color {
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
