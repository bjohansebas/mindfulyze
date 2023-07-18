import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import {
  CreateUserDto,
  UpdateEmailUserDto,
  UpdatePasswordDto,
} from '../dtos/user.dto';

import { User } from '../entities/user.entity';

import { DEFAULT_COST } from '@/utils/saltRounds';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAccountAndProfile(id: string): Promise<User> {
    const user: User = await this.userRepo.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findAccount(id: string): Promise<User> {
    const user: User = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findPlaces(id_user: string) {
    const user: User = await this.userRepo.findOne({
      where: {
        id: id_user,
      },
      relations: ['places', 'places.color'],
    });

    if (!user) {
      throw new NotFoundException(`User #${id_user} not found`);
    }

    return user.places;
  }

  async findThinks(id_user: string) {
    const user: User = await this.userRepo.findOne({
      where: {
        id: id_user,
      },
      relations: ['thinks'],
    });

    return user?.thinks || [];
  }

  async findEmail(email: string): Promise<User> {
    const user: User = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`This email:${email} not found`);
    }

    return user;
  }

  async findNotExistEmail(email: string): Promise<boolean> {
    const user: User = await this.userRepo.findOne({ where: { email } });

    if (user) {
      throw new NotFoundException(`This email:${email} is used`);
    }

    return true;
  }

  async createUser(payload: CreateUserDto) {
    await this.findNotExistEmail(payload.email);

    const newUser = this.userRepo.create(payload);

    const hashPassword = await bcrypt.hash(newUser.password, DEFAULT_COST);
    newUser.password = hashPassword;

    const isUser = this.userRepo.save(newUser);

    return isUser;
  }

  async updateUser(id: string, payload: UpdateEmailUserDto): Promise<User> {
    const existUser: User = await this.findAccount(id);

    await this.findNotExistEmail(payload.email);

    this.userRepo.merge(existUser, payload);

    return this.userRepo.save(existUser).catch((e) => e);
  }

  async updatePassword(id: string, payload: UpdatePasswordDto) {
    const user: User = await this.findAccount(id);

    const isMatchPassword: boolean = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException(`The password not match`);
    }

    user.password = await bcrypt.hash(payload.newPassword, DEFAULT_COST);

    return this.userRepo.save(user).catch((e) => e);
  }

  async remove(id: string) {
    await this.findAccount(id);

    return this.userRepo.delete(id).catch((e) => e);
  }
}
