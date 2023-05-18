import { IAccount } from "@/types/Accounts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import styles from "./AccountItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

interface IAccountItemProps {
  account: IAccount;
}

const AccountItem = ({ account }: IAccountItemProps) => {
  const onDelete = () => {
    console.log("Delete", account.id);
  };

  return (
    <Box>
      <Card className={styles.card}>
        <CardHeader
          title={account.name}
          action={
            <IconButton onClick={onDelete} className={styles.deleteBtn}>
              <DeleteIcon />
            </IconButton>
          }
          titleTypographyProps={{
            width: "200px",
            noWrap: true,
            textOverflow: "ellipsis",
          }}
        />
        <CardContent className={styles.content}>
          <Typography variant="caption">{account.id}</Typography>{" "}
        </CardContent>
        <CardActions className={styles.actions}>
          <Button
            size="small"
            variant="text"
            className={styles.actionBtn}
            href={`/account/${account.id}`}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AccountItem;
