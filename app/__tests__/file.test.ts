import { test, expect, vi } from "vitest";
import FileService from "../services/file";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

vi.mock("firebase/storage", () => ({
  ref: vi.fn(),
  uploadBytes: vi.fn().mockResolvedValue({ ref: {} }),
  getDownloadURL: vi.fn().mockResolvedValue("https://example.com/test.txt"),
}));

vi.mock("../lib/firebase/config", () => ({
  storage: {},
}));

test("should upload a file to Firebase Storage", async () => {
  const file = new File([""], "test.txt");
  
  const result = await FileService.upload(file);

  expect(ref).toHaveBeenCalled();
  expect(uploadBytes).toHaveBeenCalled();
  expect(getDownloadURL).toHaveBeenCalled();
  expect(result).toEqual("https://example.com/test.txt");
});
