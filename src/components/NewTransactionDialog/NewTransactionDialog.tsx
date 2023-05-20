import { useAppDispatch } from "@/store";
import { createAccount } from "@/store/accounts.slice";
import { TransactionEnum } from "@/types/Accounts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

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
  const [amount, setAmount] = useState<number>();

  const createNewTransaction = (event: React.FormEvent) => {
    event.preventDefault();
    const { currentTarget } = event;
    // @ts-ignore
    const transactionType = currentTarget.transactionType.value;
    // @ts-ignore
    const amount = currentTarget.amount.value;
    if (transactionType && amount) {
      console.log(transactionType, amount);
      // dispatch(createAccount({ id: accountId, name: accountName }));
      // setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
          <Select
            fullWidth
            name="transactionType"
            id="transactionType"
            label="Type"
          >
            <MenuItem value={TransactionEnum.DEPOSIT}>
              {TransactionEnum.DEPOSIT}
            </MenuItem>
            <MenuItem value={TransactionEnum.WITHDRAWAL}>
              {TransactionEnum.WITHDRAWAL}
            </MenuItem>
          </Select>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
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
