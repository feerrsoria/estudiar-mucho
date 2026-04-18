
import { test, expect, vi } from "vitest";
import FileService from "../services/file";
import { createClient } from "@supabase/supabase-js";

const mockUpload = vi.fn();

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: vi.fn(() => ({
        upload: mockUpload,
      })),
    },
  })),
}));

test("should upload a file", async () => {
  const file = new File([""], "test.txt");
  const path = "test.txt";
  mockUpload.mockResolvedValue({ data: { path }, error: null });

  const result = await FileService.upload(file);

  expect(result).toEqual(path);
});
