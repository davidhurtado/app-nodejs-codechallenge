import { TransferStatus } from 'src/anti-fraud/domain/entities/transaction';
import { IPrimaryPort } from '../ports/primary/IAntiFraudPrimaryPort';
import { ISecondaryPort } from '../ports/secondary/IAntiFraudSecondaryPort';
import { TransactionDTO } from 'src/anti-fraud/domain/dtos/transactionDto';

export class AntiFraudUseCases implements IPrimaryPort {
  constructor(private secondaryPort: ISecondaryPort) {
    this.secondaryPort = secondaryPort;
  }

  antiFraudListenerQueue(body: TransactionDTO): void {
    const status =
      body.value > 1000 ? TransferStatus.REJECTED : TransferStatus.APPROVED;
    this.secondaryPort.updateTransactionStatusQueue(body._id, status);
  }
}
