import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { StatisticService } from '../services/statistic.service'

@Controller({ path: 'statistics', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Get('all')
  getAll(@Request() req) {
    return this.statisticService.getAllEmotionByThinks(req.user.sub)
  }

  @Get('positive')
  getPositive(@Request() req) {
    return this.statisticService.getPositiveEmotionByThinks(req.user.sub)
  }

  @Get('negative')
  getNegative(@Request() req) {
    return this.statisticService.getNegativeEmotionByThinks(req.user.sub)
  }
}
