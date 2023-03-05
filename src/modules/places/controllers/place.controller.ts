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

import { CreatePlaceDto, UpdatePlaceDto } from '../dtos/place.dto';

import { PlacesService } from '../services/places.service';

@Controller({ path: 'places', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class PlaceController {
  constructor(private placeService: PlacesService) {}

  @Get(':id')
  getPlace(@Param('id', ParseUUIDPipe) id: string) {
    return this.placeService.findById(id);
  }

  @Post('')
  createPlace(@Request() req, @Body() payload: CreatePlaceDto) {
    return this.placeService.create(req.user.sub, payload);
  }

  @Put(':id')
  updatePlace(
    @Request() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePlaceDto,
  ) {
    return this.placeService.update(id, payload, req.user.sub);
  }

  @Delete(':id')
  deletePlace(@Param('id', ParseUUIDPipe) id: string) {
    return this.placeService.remove(id);
  }
}
