"use client";
import { Box, Button, Typography } from "@mui/material";
import styles from "./page.module.css";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { selectAccountById } from "@/store/accounts.slice";
import { IAccount } from "@/types/Accounts";
import Transactions from "@/components/Transactions";
import Link from "next/link";

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
      <Link href="/" className={styles.backLink}>
        <ArrowBackIcon /> Back
      </Link>
      <Typography variant="h5" className={styles.title}>
        {name}
      </Typography>
      <Button size="small" variant="outlined" className={styles.action}>
        <AddIcon /> New transaction
      </Button>
      <div className={styles.contentBody}>
        {transactions.length ? (
          <Transactions transactions={transactions} />
        ) : (
          <Box>No transactions</Box>
        )}
      </div>
    </Box>
  );
};

export default AccountDetails;
