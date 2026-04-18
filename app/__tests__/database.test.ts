
import { test, expect, vi } from "vitest";
import DatabaseService from "../services/database";

vi.mock("firebase/auth");
vi.mock("firebase/firestore");

test("should create a collection", async () => {
  const { addDoc, collection, getFirestore } = await import("firebase/firestore");
  const collectionData = { userId: "123", name: "Test Collection" };
  const id = "456";
  (addDoc as any).mockResolvedValue({ id });
  (collection as any).mockReturnValue({});
  (getFirestore as any).mockReturnValue({});

  const result = await DatabaseService.createCollection(collectionData);

  expect(result).toEqual({ ...collectionData, id });
});

test("should get collections", async () => {
  const { getDocs } = await import("firebase/firestore");
  const userId = "123";
  const collections = [{ userId, name: "Test Collection", id: "456" }];
  (getDocs as any).mockResolvedValue({ docs: collections.map((c) => ({ data: () => c, id: c.id })) });

  const result = await DatabaseService.getCollections(userId);

  expect(result).toEqual(collections);
});

test("should create a card", async () => {
  const { addDoc } = await import("firebase/firestore");
  const card = {
    userId: "123",
    collectionId: "456",
    question: "Test Question",
    answer: "Test Answer",
    page: 1,
    title: "Test Title",
  };
  const id = "789";
  (addDoc as any).mockResolvedValue({ id });

  const result = await DatabaseService.createCard(card);

  expect(result).toEqual({ ...card, id });
});

test("should get cards", async () => {
  const { getDocs } = await import("firebase/firestore");
  const collectionId = "456";
  const cards = [
    {
      userId: "123",
      collectionId,
      question: "Test Question",
      answer: "Test Answer",
      page: 1,
      title: "Test Title",
      id: "789",
    },
  ];
  (getDocs as any).mockResolvedValue({ docs: cards.map((c) => ({ data: () => c, id: c.id })) });

  const result = await DatabaseService.getCards(collectionId);

  expect(result).toEqual(cards);
});
