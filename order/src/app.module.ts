import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdermsModule } from './orderms/orderms.module';
import { TestConsumer } from './init.consumer';
import { ConsumerService } from './kafka/consumer.service';
import { ProducerService } from './kafka/producer.service';
const path = require('path');

const entitiesBasePath = __dirname.replace(path.join('common', 'typeorm', 'configuration'), '');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [entitiesBasePath + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    OrdermsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConsumerService, TestConsumer, ProducerService],
})
export class AppModule { }
