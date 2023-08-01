import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { PlacesService } from '../services/places.service'

@Controller({ path: 'places', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class PlaceController {
  constructor(private placeService: PlacesService) {}

  @Get()
  getAllPlaces() {
    return this.placeService.findAll()
  }

  @Get(':id')
  getPlace(@Param('id', ParseUUIDPipe) id: string) {
    return this.placeService.findById(id)
  }
}
