import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateColorDto, UpdateColorDto } from '../dtos/color.dto';
import { ColorService } from '../services/color.service';

@Controller({ path: 'colors', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class ColorController {
  constructor(private colorService: ColorService) {}

  @Get(':id')
  getColor(@Param('id', ParseUUIDPipe) id: string) {
    return this.colorService.findColor(id);
  }

  @Post('')
  createColor(@Request() req, @Body() payload: CreateColorDto) {
    return this.colorService.createColor(req.user.sub, payload);
  }

  @Put(':id')
  updateColor(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateColorDto,
  ) {
    return this.colorService.updateColor(id, payload);
  }

  @Delete(':id')
  deleteColor(@Param('id', ParseUUIDPipe) id: string) {
    return this.colorService.removeColor(id);
  }
}
