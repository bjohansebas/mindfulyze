import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { PayloadToken } from '../models/token.model'
import { SessionsService } from '../services/session.service'

import config from '@/config'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private sessionService: SessionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwt.refreshSecret,
      ignoreExpiration: true,
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: PayloadToken) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim()

    const isMatch: boolean = await this.sessionService.verifySession(refreshToken)

    if (!isMatch) throw new ForbiddenException('Access Denied')

    return { ...payload, refreshToken }
  }
}
