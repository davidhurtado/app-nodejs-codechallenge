import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Kafka, Producer } from 'kafkajs';
import { Model } from 'mongoose';
import { ISecondaryPort } from 'src/transactions/application/ports/secondary/ITransactionSecondaryPort';
import { TransactionDTO } from 'src/transactions/domain/dtos/transactionDto';
import {
  Transaction,
  TransactionDocument,
} from 'src/transactions/domain/entities/transaction';

@Injectable()
export class TransactionSecondaryAdapter implements ISecondaryPort {
  private kafka: Kafka;
  private producer: Producer;
  private logger = new Logger('TransactionSecondaryAdapter');
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<TransactionDocument>,
  ) {
    this.kafka = new Kafka({
      clientId: 'transactions-queue',
      brokers: ['kafka:9092'],
    });
    this.transactionModel = transactionModel;
    this.producer = this.kafka.producer();
  }
  async createTransaction(dto: TransactionDTO): Promise<Transaction> {
    const createdTransaction = await this.transactionModel.create(dto);
    return createdTransaction.toObject();
  }

  async getTransaction(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({
      _id: transactionId,
    });
    return transaction?.toObject();
  }

  async updateTransactionStatusQueue(
    transactionId: string,
    status: string,
  ): Promise<void> {
    await this.transactionModel.updateOne(
      {
        _id: transactionId,
      },
      { $set: { status } },
    );
  }

  async antiFraudSenderQueue(transaction: Transaction): Promise<void> {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: 'check-anti-fraud',
        messages: [{ key: transaction.id, value: JSON.stringify(transaction) }],
      });
      this.logger.log(
        `Transaction ${JSON.stringify(transaction)} status check anti-fraud`,
      );
    } catch (error) {
      this.logger.error(`Failed to update transaction error: ${error}`);
    } finally {
      await this.producer.disconnect();
    }
  }
}
