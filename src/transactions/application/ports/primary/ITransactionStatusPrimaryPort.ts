import { TransactionStatusDto } from 'src/transactions/domain/dtos/transactionDto';

export interface IPrimaryPort {
  updateTransactionStatusQueue(body: TransactionStatusDto): void;
}
