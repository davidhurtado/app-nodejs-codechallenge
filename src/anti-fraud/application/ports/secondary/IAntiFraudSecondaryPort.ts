export interface ISecondaryPort {
  updateTransactionStatusQueue(id: string, status: string): void;
}
