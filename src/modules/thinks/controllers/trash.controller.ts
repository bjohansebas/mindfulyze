import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ThinksService } from '../services/thinks.service';
import { TrashService } from '../services/trash.service';

@Controller('trash')
@UseGuards(AuthGuard('jwt'))
export class TrashController {
  constructor(
    private trashService: TrashService,
    private thinkService: ThinksService,
  ) {}

  @Get(':id')
  getTrash(@Param('id', ParseUUIDPipe) id: string) {
    return this.trashService.findById(id);
  }

  @Put(':id')
  restoreTrash(@Param('id', ParseUUIDPipe) id: string) {
    return this.thinkService.removeOfTrash(id);
  }

  @Delete(':id')
  deleteTrash(@Param('id', ParseUUIDPipe) id: string) {
    return this.trashService.remove(id);
  }
}
