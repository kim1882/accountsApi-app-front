import { Box, Button, Typography, CircularProgress } from "@mui/material";
import styles from "./AccountsList.module.css";
import { useEffect } from "react";
import { IAccount } from "@/types/Accounts";
import AccountItem from "../AccountItem";
import AddIcon from "@mui/icons-material/Add";
import {
  loadAccounts,
  selectAccounts,
  selectAccountsError,
  selectAccountsStatus,
} from "@/store/accounts.slice";
import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const accounts: IAccount[] = useSelector(selectAccounts);
  const accountsStatus = useSelector(selectAccountsStatus);
  const accountsError = useSelector(selectAccountsError);

  useEffect(() => {
    if (accountsStatus === "idle") dispatch(loadAccounts());
  }, [dispatch, accountsStatus]);

  return (
    <Box mx={4} className={styles.content}>
      <Typography variant="h4" className={styles.title}>
        Accounts
      </Typography>
      <Button size="small" variant="outlined" className={styles.action}>
        <AddIcon /> New account
      </Button>
      {accountsStatus === "loading" ? (
        <CircularProgress />
      ) : accountsStatus === "succeeded" ? (
        accounts.length ? (
          <div className={styles.contentBody}>
            {accounts.map((account) => (
              <AccountItem key={account.id} account={account} />
            ))}
          </div>
        ) : (
          <Box>No accounts found. Please create a new account.</Box>
        )
      ) : accountsStatus === "failed" ? (
        <Box>{accountsError}</Box>
      ) : null}
    </Box>
  );
};

export default Accounts;
