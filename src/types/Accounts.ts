export enum TransactionEnum {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

export interface ITransaction {
  id: string;
  type: TransactionEnum;
  amount: number;
}

export interface IAccount {
  id: string;
  name: string;
  transactions: ITransaction[];
}
