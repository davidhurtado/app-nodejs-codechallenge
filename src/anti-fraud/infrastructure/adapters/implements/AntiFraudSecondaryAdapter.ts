import { Injectable, Logger } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { ISecondaryPort } from 'src/anti-fraud/application/ports/secondary/IAntiFraudSecondaryPort';

@Injectable()
export class AntiFraudSecondaryAdapter implements ISecondaryPort {
  private kafka: Kafka;
  private producer: Producer;
  private logger = new Logger('AntiFraudSecondaryAdapter');
  constructor() {
    this.kafka = new Kafka({
      clientId: 'transactions-queue',
      brokers: ['kafka:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async updateTransactionStatusQueue(
    transactionId: string,
    status: string,
  ): Promise<void> {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: 'transaction-status-updates',
        messages: [
          {
            key: transactionId,
            value: JSON.stringify({ id: transactionId, status }),
          },
        ],
      });
      this.logger.log(
        `Transaction ${transactionId} status updated to ${status}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to update transaction ${transactionId} status: ${error}`,
      );
    } finally {
      await this.producer.disconnect();
    }
  }
}
