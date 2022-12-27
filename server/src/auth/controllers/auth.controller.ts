import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from '../../modules/users/dtos/user.dto';
import { UsersService } from '../../modules/users/services/users.service';
import { AuthService } from '../services/auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.generateJWT(req.user);
  }

  @Post('signup')
  async signup(@Body() payload: CreateUserDto) {
    return this.userService.createUser(payload);
  }
}
