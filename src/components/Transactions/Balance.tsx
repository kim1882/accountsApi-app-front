import { ITransaction, TransactionEnum } from "@/types/Accounts";
import { Box } from "@mui/material";
import styles from "./Transactions.module.css";

interface IBalanceProps {
  transactions: ITransaction[];
}

const Balance = ({ transactions }: IBalanceProps) => {
  const getBalance = () => {
    let total = 0;
    transactions.forEach((item) => {
      if (item.type === TransactionEnum.DEPOSIT) total += item.amount;
      if (item.type === TransactionEnum.WITHDRAWAL) total -= item.amount;
    });
    return total;
  };

  const total = getBalance();

  return (
    <Box className={styles.balance}>
      <Box className={styles.title}>Balance:</Box>
      <Box className={total > 0 ? styles.deposit : styles.withdrawal}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </Box>
    </Box>
  );
};

export default Balance;
