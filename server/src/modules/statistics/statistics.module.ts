import { Module } from '@nestjs/common';

import { ThinksModule } from '../thinks/thinks.module';

import { StatisticService } from './services/statistic.service';

import { StatisticController } from './controllers/statistic.controller';

@Module({
  imports: [ThinksModule],
  providers: [StatisticService],
  controllers: [StatisticController],
})
export class StatisticsModule {}
