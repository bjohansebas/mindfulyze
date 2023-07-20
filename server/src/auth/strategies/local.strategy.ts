import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from '../services/auth.service'

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' })
	}

	async validate(email: string, passport: string) {
		const user = await this.authService.validateUser(email, passport)

		if (!user) {
			throw new UnauthorizedException('Wrong email or password, please try again')
		}

		return user
	}
}
