import { describe, it, expect, vi } from "vitest";
import { saveFlashcards, parseFile } from "../actions";

vi.mock("../lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: { id: "123" } } }))
    },
    from: vi.fn(() => ({
      insert: vi.fn(() => Promise.resolve({ data: {}, error: null }))
    }))
  }))
}));

vi.mock("pdf-parse-fork", () => ({
  __esModule: true,
  default: vi.fn().mockResolvedValue({ text: "pdf text" }),
}));

vi.mock("mammoth", () => ({
  default: {
    extractRawText: vi.fn().mockResolvedValue({ value: "docx text" })
  }
}));

vi.mock("jszip", () => ({
  default: {
    loadAsync: vi.fn().mockResolvedValue({
      files: {
        "ppt/slides/slide1.xml": {
          async: () => Promise.resolve("<a:t>pptx text</a:t>")
        }
      }
    })
  }
}));

describe("actions", () => {
  it("should save flashcards", async () => {
    const cards = [{ question: "q1", answer: "a1" }];
    const result = await saveFlashcards(cards);
    expect(result.error).toBeUndefined();
  });

  it("should parse a pdf file", async () => {
    const file = new File([""], "test.pdf", { type: "application/pdf" });
    const text = await parseFile(file);
    expect(text).toBe("pdf text");
  });

  it("should parse a docx file", async () => {
    const file = new File([""], "test.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const text = await parseFile(file);
    expect(text).toBe("docx text");
  });

  it("should parse a pptx file", async () => {
    const file = new File([""], "test.pptx", { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
    const text = await parseFile(file);
    expect(text).toBe("pptx text");
  });
});