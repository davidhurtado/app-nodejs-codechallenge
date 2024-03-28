import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './domain/entities/transaction';
import { TransactionSecondaryAdapter } from './infrastructure/adapters/implements/TransactionSecondaryAdapter';
import { TransactionController } from './infrastructure/controllers/TransactionPrimaryAdapter';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionSecondaryAdapter],
})
export class TransactionModule {}
