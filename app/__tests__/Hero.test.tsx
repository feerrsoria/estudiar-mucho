import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hero from "../components/features/Hero";

vi.mock("../components/ui/Globe", () => ({
  default: () => <div>Globe</div>
}));

describe("Hero", () => {
  it("renders the hero component", () => {
    render(<Hero />);
    expect(screen.getByText("Learn anything, faster.")).toBeInTheDocument();
  });
});
