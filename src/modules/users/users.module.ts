import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';

import { Color } from './entities/color.entity';
import { ProfileUser } from './entities/profile.entity';
import { User } from './entities/user.entity';

import { UsersService } from './services/users.service';
import { ProfileService } from './services/profile.service';
import { ColorService } from './services/color.service';
import { ColorController } from './controllers/color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Color, ProfileUser, User])],
  controllers: [UsersController, ColorController],
  providers: [UsersService, ProfileService, ColorService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
