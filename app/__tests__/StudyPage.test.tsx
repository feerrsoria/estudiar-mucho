import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import StudyPage from "../[locale]/collections/[collectionId]/page";
import DatabaseService from "../services/database";
import AuthService from "../services/auth";

// Mock the services
vi.mock("../services/database", () => ({
  default: {
    getCards: vi.fn(),
    getCollection: vi.fn(),
  },
}));

vi.mock("../services/auth", () => ({
  default: {
    onAuthStateChanged: vi.fn().mockReturnValue(() => {}),
  },
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useParams: () => ({
    collectionId: "test-collection",
    locale: "en",
  }),
}));

// Mock locales
vi.mock("../../locales/client", () => ({
  useI18n: () => (key: string) => key,
}));

describe("StudyPage", () => {
  const mockCards = [
    { id: "1", question: "Q1", answer: "A1", page: 1, title: "T1", collection_id: "test-collection" },
    { id: "2", question: "Q2", answer: "A2", page: 2, title: "T2", collection_id: "test-collection" },
  ];

  const mockCollection = {
    id: "test-collection",
    name: "Test Collection",
    user_id: "user-1",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (DatabaseService.getCards as any).mockResolvedValue(mockCards);
    (DatabaseService.getCollection as any).mockResolvedValue(mockCollection);
    
    // Mock scrollIntoView
    if (!window.HTMLElement.prototype.scrollIntoView) {
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
    }
  });

  it("renders cards and allows selection", async () => {
    render(<StudyPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Collection")).toBeInTheDocument();
    });

    // Check if cards are present (large card and thumbnails)
    const q1Elements = screen.getAllByText("Q1");
    expect(q1Elements.length).toBeGreaterThanOrEqual(1);
    
    // Find thumbnails and click the second one
    const q2Elements = screen.getAllByText("Q2");
    fireEvent.click(q2Elements[0]);

    // Verify scrollIntoView was called (indirectly through the effect)
    await waitFor(() => {
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it("has responsive classes for mobile compactness", async () => {
    const { container } = render(<StudyPage />);
    
    // Check for the main container padding (now pt-32 for fixed navbar)
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.className).toContain("pt-32");
    expect(mainDiv.className).toContain("pb-12");
  });
});
