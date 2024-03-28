export interface TransactionDTO {
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transferTypeId: number;
  transactionStatus?: string;
  value: number;
}

export interface TransactionStatusDto {
  id: string;
  status: string;
}
