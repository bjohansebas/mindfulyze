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

import { ThinksService } from 'modules/thinks/services/thinks.service';
import { TrashService } from 'modules/thinks/services/trash.service';
import { PlacesService } from '../services/places.service';

import { CreatePlaceDto, UpdatePlaceDto } from '../dtos/place.dto';

@Controller({ path: 'places', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class PlaceController {
  constructor(
    private placeService: PlacesService,
    private thinkService: ThinksService,
    private trashService: TrashService,
  ) {}

  @Get(':id')
  getPlace(@Param('id', ParseUUIDPipe) id: string) {
    return this.placeService.findById(id);
  }

  @Get(':id/thinks')
  getThinks(@Param('id', ParseUUIDPipe) id: string) {
    return this.thinkService.findUnarchiveThinksByPlace(id);
  }

  @Get(':id/thinks/archive')
  getArchiveThinks(@Param('id', ParseUUIDPipe) id: string) {
    return this.thinkService.findArchiveThinksByPlace(id);
  }

  @Get(':id/trash')
  getTrash(@Param('id', ParseUUIDPipe) id: string) {
    return this.trashService.findTrashByPlace(id);
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
