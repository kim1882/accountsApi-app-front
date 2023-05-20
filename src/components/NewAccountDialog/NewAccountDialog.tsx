import { useAppDispatch } from "@/store";
import { createAccount } from "@/store/accounts.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

interface INewAccountDialogProps {
  open: boolean;
  setOpen(open: boolean): void;
}

const NewAccountDialog = ({ open, setOpen }: INewAccountDialogProps) => {
  const dispatch = useAppDispatch();
  const newAccountFields = [
    { autoFocus: true, id: "accountName", label: "Name" },
    {
      id: "accountId",
      label: "Account Number",
      value: uuidv4(),
    },
  ];

  const createNewAccount = (event: React.FormEvent) => {
    event.preventDefault();
    const { currentTarget } = event;
    // @ts-ignore
    const accountId = currentTarget.accountId.value;
    // @ts-ignore
    const accountName = currentTarget.accountName.value;
    if (accountId && accountName) {
      dispatch(createAccount({ id: accountId, name: accountName }));
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <form onSubmit={createNewAccount}>
        <DialogTitle>Create New Account</DialogTitle>
        <DialogContent>
          {newAccountFields.map((field) => (
            <TextField
              key={field.id}
              id={field.id}
              name={field.id}
              type="text"
              fullWidth
              autoFocus={field.autoFocus}
              variant="outlined"
              label={field.label}
              margin="dense"
              value={field.value}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewAccountDialog;
