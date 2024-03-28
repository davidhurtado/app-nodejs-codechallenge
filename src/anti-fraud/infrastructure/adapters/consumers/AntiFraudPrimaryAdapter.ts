import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { AntiFraudUseCases } from 'src/anti-fraud/application/useCases/AntiFraudUseCase';
import { AntiFraudSecondaryAdapter } from '../implements/AntiFraudSecondaryAdapter';
import { messageToTransaction } from 'src/anti-fraud/domain/mapper/transaction';

@Injectable()
export class AntiFraudConsumerQueue implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;
  private readonly _useCases: AntiFraudUseCases;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'transactions-queue',
      brokers: ['kafka:9092'],
    });
    const secondaryPort = new AntiFraudSecondaryAdapter();
    this._useCases = new AntiFraudUseCases(secondaryPort);
    this.consumer = this.kafka.consumer({ groupId: 'transaction-group' });
  }

  async onModuleInit() {
    await this.connect();
    await this.subscribe();
    await this.run();
  }

  private async connect() {
    await this.consumer.connect();
  }

  private async subscribe() {
    await this.consumer.subscribe({
      topic: 'check-anti-fraud',
      fromBeginning: true,
    });
  }

  private async run() {
    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        if (message.value) {
          this._useCases.antiFraudListenerQueue(
            messageToTransaction(message.value.toString()),
          );
        }
      },
    });
  }
}
