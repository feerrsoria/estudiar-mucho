import { vi, describe, it, expect } from "vitest";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { 
  createDocument, 
  fetchDocuments, 
  updateDocument, 
  removeDocument 
} from "../lib/firebase/firestore";

vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

vi.mock("../lib/firebase/config", () => ({
  db: {},
}));

describe("Firebase Firestore Service", () => {
  it("should create a document", async () => {
    const data = { name: "Test" };
    (addDoc as any).mockResolvedValue({ id: "123" });

    const result = await createDocument("test-collection", data);

    expect(collection).toHaveBeenCalledWith({}, "test-collection");
    expect(addDoc).toHaveBeenCalled();
    expect(result.id).toBe("123");
  });

  it("should fetch documents", async () => {
    const mockDocs = [
      { id: "1", data: () => ({ name: "Test 1" }) },
      { id: "2", data: () => ({ name: "Test 2" }) },
    ];
    (getDocs as any).mockResolvedValue({ docs: mockDocs });

    const result = await fetchDocuments("test-collection");

    expect(collection).toHaveBeenCalledWith({}, "test-collection");
    expect(getDocs).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Test 1");
  });

  it("should update a document", async () => {
    const data = { name: "Updated" };
    (updateDoc as any).mockResolvedValue(undefined);

    await updateDocument("test-collection", "123", data);

    expect(doc).toHaveBeenCalledWith({}, "test-collection", "123");
    expect(updateDoc).toHaveBeenCalled();
  });

  it("should delete a document", async () => {
    (deleteDoc as any).mockResolvedValue(undefined);

    await removeDocument("test-collection", "123");

    expect(doc).toHaveBeenCalledWith({}, "test-collection", "123");
    expect(deleteDoc).toHaveBeenCalled();
  });
});
