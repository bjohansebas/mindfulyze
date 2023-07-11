import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestExpress } from 'express';

import { CreateUserDto } from 'modules/users/dtos/user.dto';

import { AuthService } from '../services/auth.service';

import { User } from 'modules/users/entities/user.entity';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: RequestExpress) {
    return await this.authService.singIn(req.user as User);
  }

  @Post('signup')
  async signUp(@Body() payload: CreateUserDto) {
    return this.authService.createAccount(payload);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshTokens(@Request() req: RequestExpress) {
    return this.authService.refreshAccessToken(
      req.user['sub'],
      req.user['refreshToken'],
    );
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('logout')
  async logOut(@Request() req: RequestExpress) {
    return this.authService.logout(req.user['sub'], req.user['refreshToken']);
  }
}
