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

import { Place } from 'modules/places/entities/place.entity'
import { User } from 'modules/users/entities/user.entity'
import { ThinkEmotion } from './thinkEmotion.entity'

@Entity({
	name: 'thinks',
})
export class Think {
	@PrimaryGeneratedColumn('uuid', {
		name: 'think_id',
	})
	id: string
	@Column({ type: 'varchar', name: 'text_think' })
	text: string
	@ManyToOne(
		() => Place,
		(place) => place.thinks,
		{
			nullable: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'place_id', foreignKeyConstraintName: 'fk_place_tk' })
	place: Relation<Place>
	@ManyToOne(
		() => User,
		(user) => user.places,
		{
			nullable: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
	)
	@JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_tk' })
	user: Relation<User>
	@OneToMany(
		() => ThinkEmotion,
		(emotion) => emotion.think,
	)
	emotions: Relation<ThinkEmotion>[]
	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date
	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date
}
