import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISecondaryPort } from 'src/transactions/application/ports/secondary/ITransactionStatusSecondaryPort';
import { TransactionDocument } from 'src/transactions/domain/entities/transaction';

@Injectable()
export class TransactionStatusSecondaryAdapter implements ISecondaryPort {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<TransactionDocument>,
  ) {
    this.transactionModel = transactionModel;
  }

  async updateTransactionStatus(
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
}
