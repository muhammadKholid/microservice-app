import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { OrdermsService } from 'src/orderms/orderms.service';

@Module({
    imports: [OrdermsService],
    providers: [ProducerService, ConsumerService],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule { }