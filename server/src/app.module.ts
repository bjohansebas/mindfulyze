import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import * as Joi from 'joi'

import config from '@/config'
import { enviroments } from '@/enviroments'

import { AuthModule } from 'auth/auth.module'
import { DatabaseModule } from 'database/database.module'
import { EmotionsModule } from 'modules/emotions/emotions.module'
import { PlacesModule } from 'modules/places/places.module'
import { StatisticsModule } from 'modules/statistics/statistics.module'
import { ThinksModule } from 'modules/thinks/thinks.module'
import { UsersModule } from 'modules/users/users.module'

@Module({
	imports: [
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
		ConfigModule.forRoot({
			envFilePath: enviroments[process.env.NODE_ENV] || '.env',
			load: [config],
			isGlobal: true,
			validationSchema: Joi.object({
				JWT_ACCESS_SECRET: Joi.string().required(),
				JWT_REFRESH_SECRET: Joi.string().required(),
				POSTGRES_USER: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_PORT: Joi.number().required(),
				POSTGRES_HOST: Joi.string().required(),
			}),
		}),
		DatabaseModule,
		UsersModule,
		EmotionsModule,
		PlacesModule,
		ThinksModule,
		AuthModule,
		StatisticsModule,
	],
})
export class AppModule {}
