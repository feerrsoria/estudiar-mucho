
"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";
import DatabaseService, { Collection } from "../../services/database";
import { Card } from "../../types";
import AuthService from "../../services/auth";
import FlippableCard from "../../components/Card";
import { User } from "@supabase/supabase-js";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        DatabaseService.getCollections(user.id).then(setCollections);
      }
    });
  }, []);

  const handleCreateCollection = async () => {
    if (user && newCollectionName) {
      const newCollection = await DatabaseService.createCollection({
        user_id: user.id,
        name: newCollectionName,
      });
      if (newCollection) {
        setCollections([...collections, newCollection]);
        setNewCollectionName("");
      }
    }
  };

  const handleSelectCollection = (collection: Collection) => {
    setSelectedCollection(collection);
    DatabaseService.getCards(collection.id!).then(setCards);
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Profile
      </Typography>
      {user ? (
        <div>
          <Typography variant="h4">My Collections</Typography>
          <div>
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant={selectedCollection?.id === collection.id ? "contained" : "outlined"}
                onClick={() => handleSelectCollection(collection)}
              >
                {collection.name}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            <TextField
              label="New Collection Name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <Button onClick={handleCreateCollection}>Create Collection</Button>
          </div>
          {selectedCollection && (
            <div className="mt-8">
              <Typography variant="h4">{selectedCollection.name}</Typography>
              <div className="flex flex-wrap gap-4 mt-4">
                {cards.map((card) => (
                  <FlippableCard key={card.id} {...card} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Typography>Please sign in to see your profile.</Typography>
      )}
    </Container>
  );
}
