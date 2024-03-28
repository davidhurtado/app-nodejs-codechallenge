import { TransactionStatusDto } from '../dtos/transactionDto';
export function messageToTransactionStatus(
  object: string,
): TransactionStatusDto {
  if (!object) return null;
  const data: TransactionStatusDto = JSON.parse(object);
  return data;
}
