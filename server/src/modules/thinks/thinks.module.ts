import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EmotionsModule } from 'modules/emotions/emotions.module'
import { PlacesModule } from 'modules/places/places.module'
import { UsersModule } from 'modules/users/users.module'

import { Think } from './entities/think.entity'

import { ThinkController } from './controllers/think.controller'

import { ThinksService } from './services/thinks.service'

@Module({
	imports: [EmotionsModule, forwardRef(() => PlacesModule), TypeOrmModule.forFeature([Think]), UsersModule],
	providers: [ThinksService],
	controllers: [ThinkController],
	exports: [ThinksService, TypeOrmModule],
})
export class ThinksModule {}
