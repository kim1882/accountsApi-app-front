import { TransactionEnum } from "@/types/Accounts"; // DELETE

export const fetchAccounts = () => {
  // const response = await fetch(some url)
  return {
    data: [
      { id: "123456789", name: "First account", transactions: [] },
      {
        id: "987654321",
        name: "Second account really long name",
        transactions: [
          { id: "t1", type: TransactionEnum.DEPOSIT, amount: 250 },
          { id: "t2", type: TransactionEnum.WITHDRAWAL, amount: 20 },
        ],
      },
    ],
  };
};
