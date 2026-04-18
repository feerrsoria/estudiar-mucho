import { 
  createDocument, 
  fetchDocuments, 
  updateDocument, 
  removeDocument 
} from "../lib/firebase/firestore";
import { where } from "firebase/firestore";
import { Card } from "../types";

export interface Collection {
  id?: string;
  user_id: string;
  name: string;
  file_name?: string;
  card_count?: number;
  created_at?: string;
}

export interface DatabaseInterface {
  createCollection(collection: Collection): Promise<Collection | null>;
  getCollections(userId: string): Promise<Collection[]>;
  updateCollection(collectionId: string, name: string): Promise<Collection | null>;
  createCard(card: Card): Promise<Card | null>;
  getCards(collectionId: string): Promise<Card[]>;
  deleteCard(cardId: string): Promise<void>;
}

class DatabaseService implements DatabaseInterface {
  async createCollection(collection: Collection): Promise<Collection | null> {
    try {
      const docRef = await createDocument("collections", {
        ...collection,
        created_at: new Date().toISOString()
      });
      return { id: docRef.id, ...collection } as Collection;
    } catch (error) {
      console.error("Error creating collection:", error);
      return null;
    }
  }

  async getCollections(userId: string): Promise<Collection[]> {
    try {
      const collections = await fetchDocuments("collections", [
        where("user_id", "==", userId)
      ]);
      
      const collectionsWithCardCount = await Promise.all(
        collections.map(async (col) => {
          const cards = await fetchDocuments("cards", [
            where("collection_id", "==", col.id)
          ]);
          return { 
            ...col, 
            card_count: cards.length 
          } as Collection;
        })
      );

      return collectionsWithCardCount;
    } catch (error) {
      console.error("Error getting collections:", error);
      return [];
    }
  }

  async updateCollection(collectionId: string, name: string): Promise<Collection | null> {
    try {
      await updateDocument("collections", collectionId, { name });
      return { id: collectionId, name } as any;
    } catch (error) {
      console.error("Error updating collection:", error);
      return null;
    }
  }

  async createCard(card: Card): Promise<Card | null> {
    try {
      const docRef = await createDocument("cards", card);
      return { id: docRef.id, ...card };
    } catch (error) {
      console.error("Error creating card:", error);
      return null;
    }
  }

  async getCards(collectionId: string): Promise<Card[]> {
    try {
      const cards = await fetchDocuments("cards", [
        where("collection_id", "==", collectionId)
      ]);
      return cards as unknown as Card[];
    } catch (error) {
      console.error("Error getting cards:", error);
      return [];
    }
  }

  async deleteCard(cardId: string): Promise<void> {
    try {
      await removeDocument("cards", cardId);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
