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
  @Column({ type: 'varchar', name: 'name' })
  name: string
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
