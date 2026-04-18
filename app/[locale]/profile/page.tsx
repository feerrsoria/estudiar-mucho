"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";
import AuthService from "../../services/auth";
import { User } from "@supabase/supabase-js";
import { useI18n } from "../../../locales/client";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const t = useI18n();

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setFirstName(user.user_metadata.first_name || "");
        setLastName(user.user_metadata.last_name || "");
        setBirthDate(user.user_metadata.birth_date || "");
      }
    });
  }, []);

  const handleSave = async () => {
    if (user) {
      await AuthService.updateUser({
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
      });
      alert("Settings saved!");
    }
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        {t("settings.title")}
      </Typography>
      {user ? (
        <div className="flex flex-col gap-4">
          <TextField
            label={t("settings.first_name")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label={t("settings.last_name")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label={t("settings.birth_date")}
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Button onClick={handleSave} variant="contained">
            {t("settings.save")}
          </Button>
        </div>
      ) : (
        <Typography>{t("settings.signin")}</Typography>
      )}
    </Container>
  );
}
