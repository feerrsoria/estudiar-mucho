"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";
import DatabaseService, { Collection } from "../../services/database";
import AuthService from "../../services/auth";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useI18n } from "../../../locales/client";

export default function Collections() {
  const [user, setUser] = useState<User | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const t = useI18n();

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        DatabaseService.getCollections(user.id).then(setCollections);
      }
    });
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h2" component="h1" gutterBottom>
          {t("collections.title")}
        </Typography>
        <Button component={Link} href="/" variant="contained">
          {t("collections.add")}
        </Button>
      </div>
      {user ? (
        <div>
          {collections.map((collection) => (
            <div key={collection.id} className="p-4 border rounded-md mb-4">
              <Typography variant="h5">{collection.name}</Typography>
            </div>
          ))}
        </div>
      ) : (
        <Typography>{t("collections.signin")}</Typography>
      )}
    </Container>
  );
}
