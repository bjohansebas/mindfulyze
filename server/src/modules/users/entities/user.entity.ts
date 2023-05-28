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

import { Color } from './color.entity';
import { Place } from '../../places/entities/place.entity';
import { Think } from '../../thinks/entities/think.entity';
import { ProfileUser } from './profile.entity';
import { Trash } from '../../thinks/entities/trash.entity';

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
  @OneToMany(() => Color, (color) => color.user)
  colors: Color[];
  @OneToMany(() => Place, (place) => place.user)
  places: Place[];
  @OneToMany(() => Think, (think) => think.user)
  thinks: Think[];
  @OneToMany(() => Trash, (trash) => trash.user)
  trash: Trash[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
