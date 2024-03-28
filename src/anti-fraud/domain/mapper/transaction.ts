import { TransactionDTO } from '../dtos/transactionDto';

export function messageToTransaction(object: string): TransactionDTO {
  if (!object) return null;
  const data: TransactionDTO = JSON.parse(object);
  return data;
}
