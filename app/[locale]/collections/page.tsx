"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import DatabaseService, { Collection } from "../../services/database";
import AuthService from "../../services/auth";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useI18n } from "../../../locales/client";

export default function Collections() {
  const [user, setUser] = useState<User | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const t = useI18n();

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        DatabaseService.getCollections(user.id).then((data) => {
          setCollections(data);
          setFilteredCollections(data);
        });
      }
    });
  }, []);

  useEffect(() => {
    let filtered = collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredCollections(filtered);
  }, [searchTerm, sortOrder, collections]);

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
      <div className="flex gap-4 mb-4">
        <TextField
          label={t("collections.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl>
          <InputLabel>{t("collections.sort_by")}</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <MenuItem value="desc">{t("collections.sort.desc")}</MenuItem>
            <MenuItem value="asc">{t("collections.sort.asc")}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {user ? (
        <div>
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="p-4 border rounded-md mb-4">
              <Typography variant="h5">{collection.name}</Typography>
              <Typography variant="body2">{collection.file_name}</Typography>
              <Typography variant="body2">Cards: {collection.card_count}</Typography>
              {collection.created_at && (
                <Typography variant="body2">Created at: {new Date(collection.created_at).toLocaleDateString()}</Typography>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Typography>{t("collections.signin")}</Typography>
      )}
    </Container>
  );
}
