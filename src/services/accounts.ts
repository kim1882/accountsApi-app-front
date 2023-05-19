const API_URL = process.env.API_URL;

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
