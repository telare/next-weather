import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LogInPage from "@/app/auth/log-in/page";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
    }),
    usePathname: () => "/auth/log-in",
  };
});

describe("Log-in page", () => {
  it("renders auth form", () => {
    render(<LogInPage />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
  it("renders email input", () => {
    render(<LogInPage />);
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
  });
  it("renders password input", () => {
    render(<LogInPage />);
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });
});
