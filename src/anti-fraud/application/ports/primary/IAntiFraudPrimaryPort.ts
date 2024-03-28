import { TransactionDTO } from 'src/anti-fraud/domain/dtos/transactionDto';

export interface IPrimaryPort {
  antiFraudListenerQueue(body: TransactionDTO): void;
}
