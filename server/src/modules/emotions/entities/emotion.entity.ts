import { Exclude } from 'class-transformer'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn,
} from 'typeorm'

import { Think } from 'modules/thinks/entities/think.entity'
import { Color } from 'modules/users/entities/color.entity'

@Entity({
	name: 'emotions',
})
export class Emotion {
	@PrimaryGeneratedColumn('uuid', {
		name: 'emotion_id',
	})
	id: string
	@Column({ unique: true, length: 20, name: 'name_emotion' })
	name: string
	@Column({
		type: 'varchar',
		length: 8,
		name: 'type_emotion',
		default: 'Negative',
	})
	type: string
	@ManyToOne(
		() => Color,
		(color) => color.emotions,
		{
			nullable: false,
			onDelete: 'RESTRICT',
			onUpdate: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'color_id', foreignKeyConstraintName: 'fk_color_em' })
	color: Relation<Color>
	@OneToMany(
		() => Think,
		(think) => think.emotions,
	)
	thinks: Relation<Think>[]
	@Exclude()
	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date
	@Exclude()
	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date
}
