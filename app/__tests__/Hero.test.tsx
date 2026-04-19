import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hero from "../components/features/Hero";
vi.mock("../i18n-provider", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useParams: () => ({ locale: "en" }),
}));

vi.mock("../lib/firebase/config", () => ({
  app: {},
  auth: {},
  db: {},
  storage: {},
}));

const translations = {
  "hero.title": "Learn anything, faster.",
  "hero.subtitle": "Upload your documents and get flashcards in seconds.",
  "hero.badge": "AI-Powered Learning",
  "hero.file.label": "Upload a file",
  "hero.prompt.label": "Custom instructions",
  "hero.submit.button": "Generate Flashcards",
};

vi.mock("../../locales/client", async () => {
  const actual = await vi.importActual("../../locales/client");
  return {
    ...actual,
    useI18n: () => (key: keyof typeof translations) => {
      return translations[key] || key;
    },
    useCurrentLocale: () => "en",
  };
});

describe("Hero", () => {
  it("renders the hero component", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Learn anything, faster.");
  });
});
