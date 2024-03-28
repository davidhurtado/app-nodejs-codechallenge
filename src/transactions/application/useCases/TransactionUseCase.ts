import { TransactionDTO } from 'src/transactions/domain/dtos/transactionDto';
import { TransactionResponse } from 'src/transactions/domain/entities/transaction';
import { IPrimaryPort } from '../ports/primary/ITransactionPrimaryPort';
import { ISecondaryPort } from '../ports/secondary/ITransactionSecondaryPort';
import { structToTransaction } from 'src/transactions/domain/mapper/transaction';

export class TransactionUseCases implements IPrimaryPort {
  constructor(private secondaryPort: ISecondaryPort) {
    this.secondaryPort = secondaryPort;
  }

  async createTransaction(dto: TransactionDTO): Promise<TransactionResponse> {
    const createdTransaction = await this.secondaryPort.createTransaction(dto);
    const transactionResponse = structToTransaction(createdTransaction);
    this.secondaryPort.antiFraudSenderQueue(createdTransaction);
    return transactionResponse;
  }

  async getTransaction(id: string): Promise<TransactionResponse> {
    return structToTransaction(await this.secondaryPort.getTransaction(id));
  }
}
