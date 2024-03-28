export interface ISecondaryPort {
  updateTransactionStatus(transactionId: string, status: string): Promise<void>;
}
