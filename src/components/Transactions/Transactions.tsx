import { ITransaction, TransactionEnum } from "@/types/Accounts";
import styles from "./Transactions.module.css";

interface ITransactionsProps {
  transactions: ITransaction[];
}

const TransactionItem = ({ transactions }: ITransactionsProps) => {
  const headers = ["id", "date", "type", "amount"];

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.row}>
          {headers.map((head, key) => (
            <th key={key} className={styles.header}>
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.map((row) => (
          <tr key={row.id} className={styles.row}>
            <td className={styles.cell}>{row.id}</td>
            <td className={styles.cell}>{row.date}</td>
            <td className={styles.cell}>{row.type}</td>
            <td
              className={`${styles.cell} ${
                row.type === TransactionEnum.DEPOSIT
                  ? styles.deposit
                  : styles.withdrawal
              }`}
            >
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(row.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionItem;
