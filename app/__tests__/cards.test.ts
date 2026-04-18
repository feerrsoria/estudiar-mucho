import { describe, it, expect } from 'vitest';
import databaseService from '../services/database';
import { Card } from '../types';

describe('Cards integration test', () => {
  it.skip('should create, read, and delete a card', async () => {
    const testCard: Card = {
      user_id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      collection_id: '1', // Replace with a valid collection ID
      question: 'What is the capital of France?',
      answer: 'Paris',
      page: 1,
      title: 'Geography',
    };

    // Create a card
    const createdCard = await databaseService.createCard(testCard);
    expect(createdCard).toBeDefined();
    expect(createdCard?.id).toBeDefined();
    expect(createdCard?.question).toBe(testCard.question);
    expect(createdCard?.answer).toBe(testCard.answer);

    // Read the card
    if (!testCard.collection_id) {
      throw new Error("collection_id is not defined");
    }
    const cards = await databaseService.getCards(testCard.collection_id);
    expect(cards).toBeDefined();
    expect(cards.length).toBeGreaterThan(0);
    const foundCard = cards.find((card) => card.id === createdCard?.id);
    expect(foundCard).toBeDefined();

    // Delete the card
    if (createdCard && createdCard.id) {
      await databaseService.deleteCard(createdCard.id);
    }
    if (!testCard.collection_id) {
      throw new Error("collection_id is not defined");
    }
    const cardsAfterDelete = await databaseService.getCards(testCard.collection_id);
    const foundCardAfterDelete = cardsAfterDelete.find(
      (card) => card.id === createdCard?.id
    );
    expect(foundCardAfterDelete).toBeUndefined();
  });
});
