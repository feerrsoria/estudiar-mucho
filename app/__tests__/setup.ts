import "@testing-library/jest-dom";
import { vi } from "vitest";
import ResizeObserver from "resize-observer-polyfill";

vi.mock("next/navigation", () => ({
  useRouter: () => ({})
}));



(global as any).ResizeObserver = ResizeObserver;
