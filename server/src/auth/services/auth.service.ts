import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

import { SessionsService } from '@/auth/services/session.service'
import { UsersService } from 'modules/users/services/users.service'

import { User } from 'modules/users/entities/user.entity'

import { CreateUserDto } from '@/modules/users/dtos/user.dto'

import config from '@/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
    private userService: UsersService,
    private sessionService: SessionsService,
    private jwtService: JwtService,
  ) {}

  async createAccount(payload: CreateUserDto) {
    const newUser: User = await this.userService.createUser(payload)
    const tokens = await this.generateTokens(newUser)

    await this.sessionService.create({ idUser: newUser.id, token: tokens.refreshToken })

    return tokens
  }

  async singIn(user: User) {
    const tokens = await this.generateTokens(user)

    await this.sessionService.create({ idUser: user.id, token: tokens.refreshToken })

    return {
      id: user.id,
      email: user.email,
      ...tokens,
    }
  }

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findEmail(email).catch(() => null)

    if (!user) {
      return null
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return null
    }

    return user
  }

  async logout(token: string) {
    return this.sessionService.remove(token)
  }

  async refreshAccessToken(refreshToken: string) {
    const token = this.jwtService.decode(refreshToken)

    const user = await this.userService.findAccount(token['sub'])

    const { accessToken } = await this.generateTokens(user)

    return { accessToken }
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.configService.jwt.accessSecret,
          expiresIn: '15min',
        },
      ),
      this.jwtService.signAsync(
        {
          ref: randomUUID(),
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.configService.jwt.refreshSecret,
          expiresIn: '1min',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
