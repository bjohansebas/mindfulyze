import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

import { User } from 'modules/users/entities/user.entity'

@Entity({
  name: 'sessions',
})
export class Session {
  @PrimaryGeneratedColumn('uuid', {
    name: 'session_id',
  })
  id: string
  @Exclude()
  @Column({ type: 'varchar', name: 'token' })
  token: string
  @ManyToOne(
    () => User,
    (user) => user.sessions,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_ss' })
  user: Relation<User>
  @Column({ type: 'timestamp', name: 'expire' })
  expires: Date
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date
}
