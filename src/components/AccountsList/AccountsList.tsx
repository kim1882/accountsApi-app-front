import { Box, Button, Typography } from "@mui/material";
import styles from "./AccountsList.module.css";
import { useEffect, useState } from "react";
import { IAccount, TransactionEnum } from "@/types/Accounts";
import AccountItem from "../AccountItem";

const Accounts = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  //temporary DELETE
  useEffect(() => {
    const acc: IAccount[] = [
      { id: "123456789", name: "First account", transactions: [] },
      {
        id: "987654321",
        name: "Second account really long name",
        transactions: [
          { id: "t1", type: TransactionEnum.DEPOSIT, amount: 250 },
          { id: "t2", type: TransactionEnum.WITHDRAWAL, amount: 20 },
        ],
      },
    ];
    setAccounts(acc);
  }, []);

  return (
    <Box mx={4} className={styles.content}>
      <Typography variant="h3" className={styles.title}>
        Accounts
      </Typography>
      <Button size="small" variant="outlined" className={styles.action}>
        Create account
      </Button>
      <div className={styles.contentBody}>
        {accounts.map((account) => (
          <AccountItem key={account.id} account={account} />
        ))}
      </div>
    </Box>
  );
};

export default Accounts;
