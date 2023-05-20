import { screen, fireEvent } from "@testing-library/react";
import Home from "./page";
import { renderWithProviders } from "../../utils/test-utils";
import * as accountServices from "../services/accounts";
import { IAccount } from "@/types/Accounts";

jest.mock("../services/accounts");

const accounts: IAccount[] = [
  { id: "1", name: "My account", transactions: [] },
];

describe("Home", () => {
  beforeEach(() => {
    accountServices.loadAccountsService.mockResolvedValue(accounts);
  });
  it("renders the home page", () => {
    renderWithProviders(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Accounts/i,
    });

    expect(heading).toBeInTheDocument();

    expect(accountServices.loadAccountsService).toHaveBeenCalled();
  });

  it("opens create new account dialog", () => {
    renderWithProviders(<Home />);

    const createAccountBtn = screen.getByRole("button", {
      name: /New Account/i,
    });

    fireEvent.click(createAccountBtn);
    const dialogHeader = screen.getByRole("heading", {
      name: /Create New Account/i,
    });

    expect(dialogHeader).toBeInTheDocument();
  });
});
