import { TransactionStatusDto } from 'src/transactions/domain/dtos/transactionDto';
import { IPrimaryPort } from '../ports/primary/ITransactionStatusPrimaryPort';
import { ISecondaryPort } from '../ports/secondary/ITransactionStatusSecondaryPort';

export class TransactionStatusUseCases implements IPrimaryPort {
  constructor(private secondaryPort: ISecondaryPort) {
    this.secondaryPort = secondaryPort;
  }

  async updateTransactionStatusQueue(
    body: TransactionStatusDto,
  ): Promise<void> {
    return await this.secondaryPort.updateTransactionStatus(
      body.id,
      body.status,
    );
  }
}
