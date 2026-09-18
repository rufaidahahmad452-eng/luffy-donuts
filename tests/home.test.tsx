import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "../app/menu/page";

vi.mock("next/image", () => ({
  default: (props: any) => {
    return <img {...props} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>;
  },
}));

vi.mock("../app/menu/page.module.css", () => ({
  default: new Proxy(
    {},
    {
      get: (_, property) => property,
    }
  ),
}));

beforeEach(() => {
  localStorage.clear();
});

describe("Menu Page", () => {
  it("renders the menu heading", () => {
    render(<Menu />);

    expect(screen.getByText("OUR DONUTS")).toBeInTheDocument();
  });

  it("renders donut products", () => {
    render(<Menu />);

    expect(screen.getAllByRole("button", { name: "+" }).length).toBeGreaterThan(0);
  });

  it("adds a donut to the order", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);

    expect(screen.getByText("YOUR ORDER")).toBeInTheDocument();
    expect(screen.queryByText("YOUR ORDER IS EMPTY")).not.toBeInTheDocument();
  });

  it("shows the confirmation message after adding a donut", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);

    expect(screen.getByText("ORDER ADDED")).toBeInTheDocument();
    expect(
      screen.getByText(/HAS BEEN ADDED TO YOUR ORDER/i)
    ).toBeInTheDocument();
  });
  it("increases the quantity when the same donut is added twice", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("decreases the quantity when the minus button is clicked", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);

    const minusButton = screen.getByRole("button", { name: "−" });

    fireEvent.click(minusButton);

    expect(screen.getByText("YOUR ORDER IS EMPTY")).toBeInTheDocument();
  });

  it("removes the donut when its quantity reaches zero", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);

    const minusButton = screen.getByRole("button", { name: "−" });

    fireEvent.click(minusButton);

    expect(screen.getByText("YOUR ORDER IS EMPTY")).toBeInTheDocument();
  });

  it("shows the total price after adding a donut", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);

    expect(screen.getByText("TOTAL")).toBeInTheDocument();
  });

  it("clears the order when PLACE ORDER is clicked", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);

    const placeOrderButton = screen.getByRole("button", {
      name: "PLACE ORDER",
    });

    fireEvent.click(placeOrderButton);

    expect(screen.getByText("YOUR ORDER IS EMPTY")).toBeInTheDocument();
  });

  it("closes the confirmation message when OK is clicked", () => {
    render(<Menu />);

    const addButtons = screen.getAllByRole("button", { name: "+" });

    fireEvent.click(addButtons[0]);

    expect(screen.getByText("ORDER ADDED")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(screen.queryByText("ORDER ADDED")).not.toBeInTheDocument();
  });
});