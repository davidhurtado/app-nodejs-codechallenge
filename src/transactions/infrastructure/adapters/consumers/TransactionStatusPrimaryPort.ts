import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { TransactionStatusUseCases } from 'src/transactions/application/useCases/TransactionStatusUseCase';
import { TransactionStatusSecondaryAdapter } from '../implements/TransactionStatusSecondaryAdapter';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDocument } from 'src/transactions/domain/entities/transaction';
import { Model } from 'mongoose';
import { messageToTransactionStatus } from 'src/transactions/domain/mapper/transactionStatus';

@Injectable()
export class TransactionStatusConsumerQueue implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;
  private readonly _useCases: TransactionStatusUseCases;
  private transactionAdapter: Model<TransactionDocument>;
  constructor(
    @InjectModel('Transaction')
    transactionModel: Model<TransactionDocument>,
  ) {
    this.kafka = new Kafka({
      clientId: 'transactions-queue',
      brokers: ['kafka:9092'],
    });
    this.transactionAdapter = transactionModel;
    const secondaryPort = new TransactionStatusSecondaryAdapter(
      this.transactionAdapter,
    );
    this._useCases = new TransactionStatusUseCases(secondaryPort);
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
      topic: 'transaction-status-updates',
      fromBeginning: true,
    });
  }

  private async run() {
    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        if (message.value) {
          this._useCases.updateTransactionStatusQueue(
            messageToTransactionStatus(message.value.toString()),
          );
        }
      },
    });
  }
}
