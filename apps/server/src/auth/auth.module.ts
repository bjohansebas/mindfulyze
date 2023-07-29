import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'modules/users/users.module'

import { AuthController } from './controllers/auth.controller'

import { AuthService } from './services/auth.service'
import { SessionsService } from './services/session.service'

import { Session } from './entities/session.entity'

import { AccessTokenStrategy } from './strategies/accessToken.strategy'
import { localStrategy } from './strategies/local.strategy'
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy'

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({}), TypeOrmModule.forFeature([Session])],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, AccessTokenStrategy, RefreshTokenStrategy, SessionsService],
  exports: [AuthService],
})
export class AuthModule {}
