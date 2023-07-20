import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Color } from './entities/color.entity'
import { ProfileUser } from './entities/profile.entity'
import { User } from './entities/user.entity'

import { ColorService } from './services/color.service'
import { ProfileService } from './services/profile.service'
import { UsersService } from './services/users.service'

import { ColorController } from './controllers/color.controller'
import { UsersController } from './controllers/users.controller'

@Module({
	imports: [TypeOrmModule.forFeature([Color, ProfileUser, User])],
	controllers: [UsersController, ColorController],
	providers: [UsersService, ProfileService, ColorService],
	exports: [ColorService, UsersService, TypeOrmModule],
})
export class UsersModule {}
