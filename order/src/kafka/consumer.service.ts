import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from 'kafkajs';
// import { DatabaseService } from '../database/database.service';
import { IConsumer } from './consumer.interface';
import { KafkaConsumer } from './kafka.consumer';
import { OrdermsService } from 'src/orderms/orderms.service';

interface KafkajsConsumerOptions {
    topic: ConsumerSubscribeTopic;
    config: ConsumerConfig;
    onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly consumers: IConsumer[] = [];

    constructor(
        private readonly configService: ConfigService,
        private readonly databaserService: OrdermsService,
    ) { }

    async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
        const consumer = new KafkaConsumer(
            topic,
            this.databaserService,
            config,
            this.configService.get('KAFKA_BROKER'),
        );
        await consumer.connect();
        await consumer.consume(onMessage);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}