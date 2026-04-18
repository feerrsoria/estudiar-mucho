"use client";

import { useState, useEffect } from "react";
import { 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  IconButton,
  InputAdornment,
  Card as MuiCard,
  CardContent,
  Chip
} from "@mui/material";
import { Search, SortAsc, SortDesc, Edit2, Plus, Clock, FileText, Layers } from "lucide-react";
import DatabaseService, { Collection } from "../../services/database";
import AuthService from "../../services/auth";
import { User } from "firebase/auth";
import Link from "next/link";
import { useI18n } from "../../../locales/client";

export default function Collections() {
  const [user, setUser] = useState<User | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [newName, setNewName] = useState("");
  const t = useI18n();

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        DatabaseService.getCollections(user.uid).then((data) => {
          setCollections(data);
          setFilteredCollections(data);
        });
      } else {
        setUser(null);
        setCollections([]);
        setFilteredCollections([]);
      }
    });
    return () => unsubscribe();
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

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setNewName(collection.name);
  };

  const handleSave = async (collectionId: string) => {
    const updatedCollection = await DatabaseService.updateCollection(collectionId, newName);
    if (updatedCollection) {
      const updatedCollections = collections.map((c) =>
        c.id === collectionId ? { ...c, name: newName } : c
      );
      setCollections(updatedCollections);
      setEditingCollection(null);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {t("collections.title")}
            </h1>
            <p className="text-foreground/60 text-lg">
              Organiza y repasa tus colecciones de flashcards
            </p>
          </div>
          <Link href="/">
            <button className="premium-button flex items-center gap-2 group">
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              {t("collections.add")}
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 glass-effect p-6 rounded-2xl border border-white/10">
          <TextField
            fullWidth
            placeholder={t("collections.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} className="text-foreground/40" />
                  </InputAdornment>
                ),
                className: "rounded-xl bg-background/50"
              }
            }}
          />
          <FormControl className="min-w-[200px]">
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="rounded-xl bg-background/50"
              startAdornment={
                <InputAdornment position="start" className="pl-2">
                  {sortOrder === "asc" ? <SortAsc size={20} /> : <SortDesc size={20} />}
                </InputAdornment>
              }
            >
              <MenuItem value="desc">{t("collections.sort.desc")}</MenuItem>
              <MenuItem value="asc">{t("collections.sort.asc")}</MenuItem>
            </Select>
          </FormControl>
        </div>

        {!user ? (
          <div className="text-center py-24 glass-effect rounded-3xl border border-white/10">
            <Typography variant="h5" className="mb-4">{t("collections.signin")}</Typography>
            <Link href="/signin">
              <button className="premium-button">{t("navbar.signin")}</button>
            </Link>
          </div>
        ) : filteredCollections.length === 0 ? (
          <div className="text-center py-24 glass-effect rounded-3xl border border-white/10 opacity-60">
            <Layers size={48} className="mx-auto mb-4 opacity-20" />
            <Typography variant="h6">No se encontraron colecciones</Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection) => (
              <div key={collection.id} className="premium-card group">
                {editingCollection?.id === collection.id ? (
                  <div className="space-y-4">
                    <TextField
                      fullWidth
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      variant="outlined"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleSave(collection.id!)}
                        variant="contained"
                        className="bg-primary flex-1 py-2 rounded-xl"
                      >
                        Save
                      </Button>
                      <Button 
                        onClick={() => setEditingCollection(null)}
                        variant="outlined"
                        className="flex-1 py-2 rounded-xl"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                          <Layers size={24} />
                        </div>
                        <IconButton 
                          onClick={() => handleEdit(collection)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 size={18} />
                        </IconButton>
                      </div>
                      
                      <Typography variant="h5" className="font-bold mb-2 line-clamp-1">
                        {collection.name}
                      </Typography>
                      
                      {collection.file_name && (
                        <div className="flex items-center gap-2 text-foreground/60 text-sm mb-4">
                          <FileText size={14} />
                          <span className="line-clamp-1">{collection.file_name}</span>
                        </div>
                      )}

                      <div className="flex gap-3 mb-6">
                        <Chip 
                          label={`${collection.card_count || 0} Flashcards`}
                          size="small"
                          className="bg-primary/10 text-primary font-semibold"
                        />
                        {collection.created_at && (
                          <div className="flex items-center gap-1 text-foreground/40 text-xs">
                            <Clock size={12} />
                            {new Date(collection.created_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <Link href={`/collections/${collection.id}`} className="mt-auto">
                      <button className="w-full py-3 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all">
                        Estudiar Ahora
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
