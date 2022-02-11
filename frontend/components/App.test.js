import AppFunctional from "./AppFunctional";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

test("b is on screen", () => {
  render(<AppFunctional />);
  const square = screen.getByTestId("active-square");
  expect(square).toHaveTextContent("B");
});

test("move count, counts", () => {
  render(<AppFunctional />);
  const moved = screen.getByTestId("moved");
  expect(moved).toHaveTextContent("You moved 0 times");
  const left = screen.getByTestId("move-left");
  left.click();
  expect(moved).toHaveTextContent("You moved 1 times");
  const up = screen.getByTestId("move-up");
  up.click();
  expect(moved).toHaveTextContent("You moved 2 times");
});

test("reset number to 0", () => {
  render(<AppFunctional />);
  const reset = screen.getByTestId("reset-number");
  expect(reset).toHaveTextContent("reset");
});
