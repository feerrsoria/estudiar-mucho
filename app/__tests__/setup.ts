import "@testing-library/jest-dom";
import { vi } from "vitest";
import ResizeObserver from "resize-observer-polyfill";

vi.mock("../lib/firebase/config", () => ({
  app: {},
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  },
  db: {},
  storage: {},
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })
}));

(global as any).ResizeObserver = ResizeObserver;
