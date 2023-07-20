import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import * as argon2 from 'argon2'

import config from '@/config'

import { User } from 'modules/users/entities/user.entity'

import { UsersService } from 'modules/users/services/users.service'
import { PayloadToken } from '../models/token.model'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		@Inject(config.KEY) private configService: ConfigType<typeof config>,
		private userService: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.jwt.refreshSecret,
			ignoreExpiration: false,
			passReqToCallback: true,
		})
	}

	async validate(req: Request, payload: PayloadToken) {
		const refreshToken = req.get('Authorization').replace('Bearer', '').trim()

		const existUser: User = await this.userService.findAccount(payload['sub'])
		const encryptTokens: string[] = existUser.refreshTokens

		let refreshTokenMatch = false

		await Promise.all(
			encryptTokens.map(async (encryptToken) => {
				const isMatch: boolean = await argon2.verify(encryptToken, refreshToken)

				if (isMatch) {
					refreshTokenMatch = true
				}
			}),
		)

		if (!refreshTokenMatch) throw new ForbiddenException('Access Denied')

		return { ...payload, refreshToken }
	}
}
