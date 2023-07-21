import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { User } from './user.entity'

@Entity({
  name: 'profile_users',
})
export class ProfileUser {
  @PrimaryGeneratedColumn('uuid', {
    name: 'profile_id',
    primaryKeyConstraintName: 'fk_user_profile',
  })
  id: string
  @Column({ type: 'varchar', name: 'photo_url', nullable: true })
  photo: string
  @Column({ type: 'varchar', name: 'first_name', length: 20 })
  firstName: string
  @Column({ type: 'varchar', name: 'last_name', nullable: true, length: 20 })
  lastName: string
  @Column({ type: 'date', name: 'years_old', nullable: true })
  birth: Date
  @Column({ type: 'varchar', name: 'preference_lang', length: 2 })
  preferenceLang: string
  @Column({ type: 'varchar', name: 'gender', length: 10 })
  gender: string
  @OneToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_profile' })
  user: Relation<User>
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
