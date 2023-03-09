import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../modules/users/services/users.service';

import { User } from '../../modules/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findEmail(email).catch(() => null);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    return user;
  }

  async generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id };

    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
