import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Throttle } from '@nestjs/throttler'
import { Request as RequestExpress } from 'express'

import { AuthService } from '../services/auth.service'

import { CreateUserDto } from 'modules/users/dtos/user.dto'

import { User } from 'modules/users/entities/user.entity'
import { SessionsService } from '../services/session.service'

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService, private sessionService: SessionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('sessions')
  async allSessions(@Req() req: RequestExpress) {
    return await this.sessionService.findSessionsByUser(req.user['sub'])
  }

  @UseGuards(AuthGuard('local'))
  @Throttle(3, 60)
  @Post('login')
  async login(@Req() req: RequestExpress) {
    return await this.authService.singIn(req.user as User)
  }

  @Post('signup')
  async signUp(@Body() payload: CreateUserDto) {
    return this.authService.createAccount(payload)
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshTokens(@Request() req: RequestExpress) {
    return this.authService.refreshAccessToken(req.user['refreshToken'])
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('logout')
  async logOut(@Request() req: RequestExpress) {
    return this.authService.logout(req.user['refreshToken'])
  }
}
