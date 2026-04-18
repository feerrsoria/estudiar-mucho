import { POST } from "../api/generate/route";
import { vi, describe, it, expect } from "vitest";

vi.mock("@ai-sdk/google-vertex", () => ({
  createVertex: vi.fn(() => vi.fn())
}));

vi.mock("ai", () => ({
  generateObject: vi.fn(() => Promise.resolve({ object: { questions: "Generated questions" } }))
}));

describe("POST", () => {
  it("should return generated questions", async () => {
    const req = {
      json: () => Promise.resolve({ text: "text", language: "en", prompt: "prompt" })
    } as Request;

    const response = await POST(req);
    const data = await response.json();

    expect(data.questions).toBe("Generated questions");
  });
});
