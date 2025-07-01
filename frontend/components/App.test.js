// frontend/components/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import AppFunctional from "./AppFunctional";

test("sanity", () => {
  expect(true).toBe(true);
});

test("renders headings and movement buttons", () => {
  render(<AppFunctional />);

  expect(
    screen.getByRole("heading", { name: /Coordinates \(2, 2\)/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /You moved 0 times/i })
  ).toBeInTheDocument();

  ["LEFT", "UP", "RIGHT", "DOWN", "reset"].forEach((txt) => {
    expect(
      screen.getByRole("button", { name: new RegExp(`^${txt}$`, "i") })
    ).toBeInTheDocument();
  });
});

test("email input accepts typing", async () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText(/type email/i);

  await userEvent.type(emailInput, "test@example.com");
  expect(emailInput).toHaveValue("test@example.com");
});

test("clicking LEFT once moves B to (1, 2) and increments steps", async () => {
  render(<AppFunctional />);

  const leftBtn = screen.getByRole("button", { name: /left/i });
  await userEvent.click(leftBtn);

  expect(
    screen.getByRole("heading", { name: /Coordinates \(1, 2\)/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /You moved 1 time/i })
  ).toBeInTheDocument();
});

test("cannot move further left when already at x = 1", async () => {
  render(<AppFunctional />);

  const leftBtn = screen.getByRole("button", { name: /left/i });

  await userEvent.click(leftBtn);
  await userEvent.click(leftBtn);

  expect(
    screen.getByRole("heading", { name: /Coordinates \(1, 2\)/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/you can't go left/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /You moved 1 time/i })
  ).toBeInTheDocument();
});
