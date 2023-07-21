import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

import { EmotionsService } from '../services/emotions.service'

@Controller({ path: 'emotions', version: '1' })
export class EmotionController {
  constructor(private emotionService: EmotionsService) {}

  @Get('')
  async getAll() {
    return this.emotionService.findAll()
  }

  @Get(':id')
  async getEmotion(@Param('id', ParseUUIDPipe) id: string) {
    return this.emotionService.findById(id)
  }
}
