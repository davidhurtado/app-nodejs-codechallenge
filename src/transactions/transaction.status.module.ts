import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './domain/entities/transaction';
import { TransactionStatusConsumerQueue } from './infrastructure/adapters/consumers/TransactionStatusPrimaryPort';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  providers: [TransactionStatusConsumerQueue],
})
export class TransactionStatusModule {}
