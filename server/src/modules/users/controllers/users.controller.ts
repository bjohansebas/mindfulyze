import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateProfileDto, UpdateProfileDto } from '../dtos/profile.dto';
import { UpdateEmailUserDto, UpdatePasswordDto } from '../dtos/user.dto';

import { ProfileService } from '../services/profile.service';
import { UsersService } from '../services/users.service';

@Controller({ path: 'users', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private userService: UsersService,
    private profileService: ProfileService,
  ) {}

  @Get('')
  getAccountAndProfile(@Request() req) {
    return this.userService.findAccountAndProfile(req.user.sub);
  }

  @Get('account')
  getAccount(@Request() req) {
    return this.userService.findAccount(req.user.sub);
  }

  @Get('places')
  gePlaces(@Request() req) {
    return this.userService.findPlaces(req.user.sub);
  }

  @Get('thinks')
  getAllThinks(@Request() req) {
    return this.userService.findAllThinks(req.user.sub);
  }

  @Get('thinks/archives')
  getArchiveThinks(@Request() req) {
    return this.userService.findArchiveThinks(req.user.sub);
  }

  @Get('thinks/unarchives')
  getUnarchiveThinks(@Request() req) {
    return this.userService.findUnarchiveThinks(req.user.sub);
  }

  @Get('trash')
  getTrash(@Request() req) {
    return this.userService.findTrash(req.user.sub);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.profileService.findProfile(req.user.sub);
  }

  @Post('profile')
  createProfile(@Request() req, @Body() payload: CreateProfileDto) {
    return this.profileService.createProfile(req.user.sub, payload);
  }

  @Put('account')
  updateAccount(@Request() req, @Body() payload: UpdateEmailUserDto) {
    return this.userService.updateUser(req.user.sub, payload);
  }

  @Put('profile')
  updateProfile(@Request() req, @Body() payload: UpdateProfileDto) {
    return this.profileService.update(req.user.sub, payload);
  }

  @Put('password')
  updatePassword(@Request() req, @Body() payload: UpdatePasswordDto) {
    return this.userService.updatePassword(req.user.sub, payload);
  }

  @Delete('')
  deleteUser(@Request() req) {
    return this.userService.remove(req.user.sub);
  }
}
