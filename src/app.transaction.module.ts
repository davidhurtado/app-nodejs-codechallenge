import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:FRaK20X5rQst8oroUayfC@mongodb:27017',
    ),
    TransactionModule,
  ],
})
export class AppTransactionModule {}
