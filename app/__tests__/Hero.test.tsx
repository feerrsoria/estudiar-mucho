import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hero from "../components/features/Hero";

vi.mock("../components/ui/Globe", () => ({
  default: () => <div>Globe</div>
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

vi.mock("../lib/firebase/config", () => ({
  app: {},
  auth: {},
  db: {},
  storage: {},
}));

vi.mock("../../../locales/client", () => ({
  useI18n: () => (key: string) => key,
  useChangeLocale: () => () => {},
  useCurrentLocale: () => "en",
}));

describe("Hero", () => {
  it("renders the hero component", () => {
    render(<Hero />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });
});
