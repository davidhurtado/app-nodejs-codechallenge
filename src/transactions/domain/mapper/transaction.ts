import { TransactionResponse } from '../entities/transaction';

export function structToTransaction(object: any): TransactionResponse {
  if (!object) return null;
  const data: TransactionResponse = {
    id: object._id,
    transactionExternalId:
      object.transferTypeId === 1
        ? object.accountExternalIdDebit
        : object.accountExternalIdCredit,
    transactionType: {
      name: object.transferTypeId === 1 ? 'debit' : 'credit',
    },
    transactionStatus: {
      name: object.transactionStatus,
    },
    value: object.value,
    createdAt: object.createdAt,
  };
  return data;
}
