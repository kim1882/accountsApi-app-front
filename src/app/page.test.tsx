import { screen } from "@testing-library/react";
import Home from "./page";
import { renderWithProviders } from "../../utils/test-utils";

describe("Home", () => {
  it("renders the home page", () => {
    renderWithProviders(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Accounts/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
