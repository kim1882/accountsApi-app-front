"use client";
import { Box, Button, Typography } from "@mui/material";
import styles from "./page.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { selectAccountById } from "@/store/accounts.slice";
import { IAccount } from "@/types/Accounts";
import TransactionItem from "@/components/TransactionItem";

interface IAccountDetailsProps {
  params: {
    id: string;
  };
}

const AccountDetails = ({ params: { id } }: IAccountDetailsProps) => {
  const account = useSelector(selectAccountById(id));
  const { name, transactions } = account as IAccount;
  console.log("Account ID", id, account);

  return (
    <Box mx={4} className={styles.content}>
      <Typography variant="h4" className={styles.title}>
        {name}
      </Typography>
      <Button size="small" variant="outlined" className={styles.action}>
        <AddIcon /> New transaction
      </Button>
      <div className={styles.contentBody}>
        {transactions.length ? (
          <>
            <>Columns</>
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </>
        ) : (
          <Box>No transactions</Box>
        )}
      </div>
    </Box>
  );
};

export default AccountDetails;
