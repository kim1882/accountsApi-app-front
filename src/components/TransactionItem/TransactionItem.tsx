import { ITransaction } from "@/types/Accounts";

interface ITransactionItemProps {
  transaction: ITransaction;
}

const TransactionItem = ({ transaction }: ITransactionItemProps) => {
  console.log("Transaction", transaction);

  return <div>{transaction.amount}</div>;
};

export default TransactionItem;
