import { useAppDispatch } from "@/store";
import { createAccount, createTransaction } from "@/store/accounts.slice";
import { TransactionEnum } from "@/types/Accounts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import NumberFormatter from "./NumberFormatter";

interface INewTransactionDialogProps {
  accountId: string;
  open: boolean;
  setOpen(open: boolean): void;
}

const NewTransactionDialog = ({
  accountId,
  open,
  setOpen,
}: INewTransactionDialogProps) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>();

  const createNewTransaction = (event: React.FormEvent) => {
    event.preventDefault();
    const { currentTarget } = event;
    // @ts-ignore
    const transactionType = currentTarget.transactionType.value;
    // @ts-ignore
    const amount = currentTarget.amount.value;
    if (transactionType && amount) {
      const transactionAmount = Number(amount.replace(/[^0-9.-]+/g, ""));
      dispatch(
        createTransaction({
          id: accountId,
          type: transactionType,
          amount: transactionAmount,
        })
      );
      setOpen(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <form onSubmit={createNewTransaction}>
        <DialogTitle>Create New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            key={"accountId"}
            id={"accountId"}
            name={"accountId"}
            type="text"
            fullWidth
            variant="outlined"
            label={"Account Number"}
            margin="dense"
            value={accountId}
          />
          <TextField
            key="transactionType"
            select
            fullWidth
            margin="dense"
            name="transactionType"
            id="transactionType"
            label="Type"
          >
            {[TransactionEnum.DEPOSIT, TransactionEnum.WITHDRAWAL].map(
              (item) => (
                <MenuItem value={item}>{item.toUpperCase()}</MenuItem>
              )
            )}
          </TextField>
          <TextField
            key={"amount"}
            id={"amount"}
            name={"amount"}
            type="text"
            fullWidth
            variant="outlined"
            label={"Amount"}
            margin="dense"
            value={amount}
            onChange={handleChange}
            InputProps={{
              inputComponent: NumberFormatter as any,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewTransactionDialog;
