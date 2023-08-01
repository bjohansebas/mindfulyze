import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { Session } from 'auth/entities/session.entity'
import { Think } from 'modules/thinks/entities/think.entity'
import { ProfileUser } from './profile.entity'

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
  })
  id: string
  @Column({ unique: true, length: 100 })
  email: string
  @Exclude()
  @Column({ type: 'varchar' })
  password: string
  @Column({
    type: 'timestamp',
    name: 'changed_password_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  changedPasswordAt: Date
  @OneToMany(
    () => Session,
    (session) => session.user,
  )
  sessions: Relation<Session>[]
  @OneToOne(
    () => ProfileUser,
    (profile) => profile.user,
    { nullable: true },
  )
  profile: Relation<ProfileUser>
  @OneToMany(
    () => Think,
    (think) => think.user,
  )
  thinks: Relation<Think>[]
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
