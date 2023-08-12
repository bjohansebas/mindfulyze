import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import * as argon2 from 'argon2'
import { randomUUID } from 'crypto'

import dayjs from 'dayjs'

import { UsersService } from '../../modules/users/services/users.service'
import { CreateSessionDto } from '../dtos/session.dto'
import { Session } from '../entities/session.entity'

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionRepo: Repository<Session>,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async findSessionById(id: string): Promise<Session> {
    const session: Session = await this.sessionRepo.findOne({
      where: {
        id,
      },
      relations: ['user'],
    })

    if (!session) {
      throw new NotFoundException(`Session #${id} not found`)
    }

    return session
  }

  async findSessionsByUser(idUser: string): Promise<Session[]> {
    const session: Session[] = await this.sessionRepo.find({
      where: {
        user: {
          id: idUser,
        },
      },
    })

    if (session == null) {
      throw new NotFoundException(`User #${idUser} not found`)
    }

    return session
  }

  async create(payload: CreateSessionDto) {
    const user = await this.userService.findAccount(payload.idUser)
    const token = this.jwtService.decode(payload.token)

    const hashedToken: string = await argon2.hash(payload.token)

    const newSession: Session = this.sessionRepo.create({
      id: token['ref'] ?? randomUUID(),
      token: hashedToken,
      expires: dayjs.unix(token['exp']).toDate(),
      user,
    })

    return this.sessionRepo.save(newSession).catch((e) => e)
  }

  async verifySession(refreshToken: string): Promise<boolean> {
    const token = this.jwtService.decode(refreshToken)

    const session = await this.findSessionById(token['ref']).catch(() => {
      throw new ForbiddenException('Access Denied')
    })

    const isMatch: boolean = await argon2.verify(session.token, refreshToken)

    const now = dayjs()

    const diff = now.diff(dayjs.unix(token['exp']))

    if (diff > 0) {
      await this.remove(refreshToken)
      throw new ForbiddenException('Access Denied')
    }

    return isMatch
  }

  async remove(refreshToken: string) {
    const token = this.jwtService.decode(refreshToken)

    return await this.sessionRepo.delete(token['ref'])
  }
}
