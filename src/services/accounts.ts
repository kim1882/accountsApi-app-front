const API_URL = process.env.API_URL;

export const createAccountService = async (id: string, name: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
    }),
  };
  const res = await fetch(`${API_URL}/api/accounts`, options);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const createdAccount = await res.json();
  return createdAccount;
};

export const loadAccountsService = async () => {
  const res = await fetch(`${API_URL}/api/accounts`);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const accounts = await res.json();
  return accounts;
};

export const deleteAccountService = async (id: string) => {
  const options = {
    method: "DELETE",
  };
  const res = await fetch(`${API_URL}/api/accounts/${id}`, options);
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  return await res.json();
};

export const createTransactionService = async (
  accountId: string,
  type: string,
  amount: number
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      amount,
    }),
  };
  const res = await fetch(
    `${API_URL}/api/accounts/${accountId}/transactions`,
    options
  );
  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }
  const updatedAccount = await res.json();
  return updatedAccount;
};
