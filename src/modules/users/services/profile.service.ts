import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProfileDto, UpdateProfileDto } from '../dtos/profile.dto';

import { ProfileUser } from '../entities/profile.entity';

import { UsersService } from './users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileUser)
    private profileRepo: Repository<ProfileUser>,
    private userService: UsersService,
  ) {}

  async findProfile(idUser: string): Promise<ProfileUser> {
    const user = await this.userService.findAccountAndProfile(idUser);

    const profile = user.profile;

    if (!profile) {
      throw new NotFoundException(`The profile hasn't been created`);
    }

    return profile;
  }

  async createProfile(idUser: string, payload: CreateProfileDto) {
    const user = await this.userService.findAccountAndProfile(idUser);

    const profile = user.profile;

    if (profile) {
      throw new ConflictException(`The profile has been created`);
    }

    const newProfile = this.profileRepo.create(payload);

    newProfile.user = user;

    const isUser = this.profileRepo.save(newProfile);

    return isUser;
  }

  async update(
    idUser: string,
    payload: UpdateProfileDto,
  ): Promise<ProfileUser> {
    const existProfile: ProfileUser = await this.findProfile(idUser);

    this.profileRepo.merge(existProfile, payload);

    return this.profileRepo.save(existProfile).catch((e) => e);
  }
}
