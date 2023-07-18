import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Place } from 'modules/places/entities/place.entity';
import { Think } from 'modules/thinks/entities/think.entity';
import { ProfileUser } from './profile.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
  })
  id: string;
  @Column({ unique: true, length: 100 })
  email: string;
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;
  @Column({
    type: 'timestamp',
    name: 'changed_password_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  changedPasswordAt: Date;
  @Exclude()
  @Column({
    type: 'varchar',
    array: true,
    name: 'refresh_tokens',
    nullable: true,
  })
  refreshTokens: string[];
  @OneToOne(() => ProfileUser, (profile) => profile.user, { nullable: true })
  profile: ProfileUser;
  @OneToMany(() => Place, (place) => place.user)
  places: Place[];
  @OneToMany(() => Think, (think) => think.user)
  thinks: Think[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
