import { TransactionDTO } from 'src/transactions/domain/dtos/transactionDto';
import { Transaction } from 'src/transactions/domain/entities/transaction';

export interface ISecondaryPort {
  createTransaction(dto: TransactionDTO): Promise<Transaction>;
  updateTransactionStatusQueue(
    transactionId: string,
    status: string,
  ): Promise<void>;
  antiFraudSenderQueue(transactionId: Transaction): Promise<void>;
  getTransaction(transactionId: string): Promise<Transaction>;
}
