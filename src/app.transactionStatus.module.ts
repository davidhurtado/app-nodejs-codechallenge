import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionStatusModule } from './transactions/transaction.status.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:FRaK20X5rQst8oroUayfC@mongodb:27017',
    ),
    TransactionStatusModule,
  ],
})
export class AppTransactionStatusModule {}
