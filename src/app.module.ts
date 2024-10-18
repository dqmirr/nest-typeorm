import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CitiesModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) =>({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_port'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_password'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize:true //dev only
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
