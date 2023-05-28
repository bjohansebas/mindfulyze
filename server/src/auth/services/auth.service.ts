import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';

import { UsersService } from '../../modules/users/services/users.service';

import { User } from '../../modules/users/entities/user.entity';

import { CreateUserDto } from '../../modules/users/dtos/user.dto';

import config from '../../config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createAccount(payload: CreateUserDto) {
    const newUser: User = await this.userService.createUser(payload);
    const tokens = await this.generateTokens(newUser);

    await this.updateRefreshToken(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async singIn(user: User) {
    const tokens = await this.generateTokens(user);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      id: user.id,
      email: user.email,
      ...tokens,
    };
  }

  async validateUser(email: string, password: string) {
    const user: User = await this.userService
      .findEmail(email)
      .catch(() => null);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    return user;
  }

  async logout(userId: string, token: string) {
    const existUser: User = await this.userService.findAccount(userId);
    const encryptTokens: string[] = existUser.refreshTokens;

    const newRefreshTokens: string[] = [];

    await Promise.all(
      encryptTokens.map(async (encryptToken) => {
        const isMatch: boolean = await argon2.verify(encryptToken, token);

        if (!isMatch) {
          newRefreshTokens.push(encryptToken);
        }
      }),
    );

    this.userRepo.merge(existUser, {
      refreshTokens: newRefreshTokens,
    });

    return this.userRepo.save(existUser).catch((e) => e);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken: string = await argon2.hash(refreshToken);

    const existUser: User = await this.userService.findAccount(userId);
    let newRefresh: string[];

    if (!existUser.refreshTokens) {
      newRefresh = [hashedRefreshToken];
    } else {
      newRefresh = [hashedRefreshToken, ...existUser.refreshTokens];
    }

    this.userRepo.merge(existUser, {
      refreshTokens: newRefresh,
    });

    return this.userRepo.save(existUser).catch((e) => e);
  }

  async refreshAccessToken(userId: string, refreshToken: string) {
    const user = await this.userService.findAccount(userId);

    if (!user || !user.refreshTokens)
      throw new ForbiddenException('Access Denied');

    const encryptTokens = user.refreshTokens;
    let refreshTokenMatch = false;

    await Promise.all(
      encryptTokens.map(async (encryptToken) => {
        const isMatch: boolean = await argon2.verify(
          encryptToken,
          refreshToken,
        );

        if (isMatch) {
          refreshTokenMatch = true;
        }
      }),
    );

    if (!refreshTokenMatch) throw new ForbiddenException('Access Denied');

    const { access_token } = await this.generateTokens(user);

    return { access_token };
  }

  async generateTokens(user: User) {
    const [access_token, refresh_token] = await Promise.all([
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
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.configService.jwt.refreshSecret,
          expiresIn: '15d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
