import { createClient } from "../lib/supabase/client";
import { Card } from "../types";

export interface Collection {
  id?: string;
  user_id: string;
  name: string;
  file_name?: string;
}

export interface DatabaseInterface {
  createCollection(collection: Collection): Promise<Collection | null>;
  getCollections(userId: string): Promise<Collection[]>;
  createCard(card: Card): Promise<Card | null>;
  getCards(collectionId: string): Promise<Card[]>;
}

class DatabaseService implements DatabaseInterface {
  private supabase = createClient();

  async createCollection(collection: Collection): Promise<Collection | null> {
    const { data, error } = await this.supabase
      .from("collections")
      .insert(collection)
      .select();
    if (error) {
      console.error(error);
      return null;
    }
    return data[0];
  }

  async getCollections(userId: string): Promise<Collection[]> {
    const { data, error } = await this.supabase
      .from("collections")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  }

  async createCard(card: Card): Promise<Card | null> {
    const { data, error } = await this.supabase.from("cards").insert(card).select();
    if (error) {
      console.error(error);
      return null;
    }
    return data[0];
  }

  async getCards(collectionId: string): Promise<Card[]> {
    const { data, error } = await this.supabase
      .from("cards")
      .select("*")
      .eq("collection_id", collectionId);
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  }
}

const databaseService = new DatabaseService();
export default databaseService;
