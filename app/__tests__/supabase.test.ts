import { test, expect } from "vitest";
import AuthService from "../services/auth";
import DatabaseService from "../services/database";
import { User } from "@supabase/supabase-js";

const email = `test-user-${Date.now()}@example.com`;
const password = "password";

test.skip("should save a random collection card to supabase and cleanup after", async () => {
  // 1. Sign up a new user
  const user = await AuthService.signUp(email, password);
  expect(user).not.toBeNull();

  // 2. Create a collection
  const collection = await DatabaseService.createCollection({
    name: "Test Collection",
    user_id: user!.id,
  });
  expect(collection).not.toBeNull();

  // 3. Create a card
  const card = await DatabaseService.createCard({
    question: "Test Question",
    answer: "Test Answer",
    page: 1,
    title: "Test Title",
    collection_id: collection!.id,
  });
  expect(card).not.toBeNull();

  // 4. Delete the card
  const { error: deleteCardError } = await DatabaseService.supabase
    .from("cards")
    .delete()
    .eq("id", card!.id);
  expect(deleteCardError).toBeNull();

  // 5. Delete the collection
  const { error: deleteCollectionError } = await DatabaseService.supabase
    .from("collections")
    .delete()
    .eq("id", collection!.id);
  expect(deleteCollectionError).toBeNull();

  // 6. Delete the user
  // To delete the user, we need to use the admin client, which requires the service role key.
  // For now, we will skip this part of the test.
});
