import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface TransactionResponse {
  id?: string;
  transactionExternalId: string;
  transactionTypeId?: number;
  transactionType: { name: string };
  transactionStatus: { name: string };
  value: number;
  createdAt: Date;
}

export enum TransferStatus {
  PENDING = 'pending',
}

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  accountExternalIdDebit: string;

  @Prop({ required: true })
  accountExternalIdCredit: string;

  @Prop({ required: true })
  transferTypeId: number;

  @Prop({ required: true })
  value: number;

  @Prop({ default: TransferStatus.PENDING })
  transactionStatus: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
