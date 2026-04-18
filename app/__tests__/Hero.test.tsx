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

vi.mock("next-international/client", () => ({
  createI18nClient: () => ({
    useI18n: () => (key: string) => key,
    I18nProviderClient: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useChangeLocale: () => () => {},
    useCurrentLocale: () => "en",
  }),
}));

describe("Hero", () => {
  it("renders the hero component", () => {
    render(<Hero />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });
});
