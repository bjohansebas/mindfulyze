import { Global, Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import config from '@/config'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPassword, dbPort, dbUser } = configService.postgres
        return {
          type: 'postgres',
          host: dbHost,
          password: dbPassword,
          port: dbPort,
          username: dbUser,
          synchronize: false,
          autoLoadEntities: true,
        }
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
