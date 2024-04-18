import { Module } from '@nestjs/common';
import { OrdermsService } from './orderms.service';
import { OrdermsController } from './orderms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderm } from './entities/orderm.entity';
import { ProducerService } from 'src/kafka/producer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orderm])],
  controllers: [OrdermsController],
  providers: [OrdermsService, ProducerService],
  exports: [OrdermsService]
})
export class OrdermsModule { }
