"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField, Avatar, IconButton } from "@mui/material";
import { User as UserIcon, Camera, Save, Settings as SettingsIcon } from "lucide-react";
import AuthService from "../../services/auth";
import { User } from "firebase/auth";
import { useI18n } from "../../../locales/client";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const t = useI18n();

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || "");
        setPhotoURL(user.photoURL || "");
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (user) {
      try {
        await AuthService.updateUser({
          displayName,
          photoURL,
        });
        alert("¡Perfil actualizado!");
      } catch (err) {
        console.error(err);
        alert("Error al actualizar el perfil");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 text-center md:text-left mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-3">
            <SettingsIcon className="text-primary" />
            {t("settings.title")}
          </h1>
          <p className="text-foreground/60 text-lg">
            Personaliza tu cuenta y preferencias
          </p>
        </div>

        {user ? (
          <div className="glass-effect rounded-3xl border border-white/10 p-8 md:p-12 space-y-12">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <Avatar 
                  src={photoURL || undefined} 
                  className="w-32 h-32 border-4 border-primary/20 shadow-2xl transition-transform group-hover:scale-105"
                >
                  {!photoURL && <UserIcon size={48} />}
                </Avatar>
                <IconButton className="absolute bottom-0 right-0 bg-primary text-white hover:bg-primary-hover shadow-lg">
                  <Camera size={20} />
                </IconButton>
              </div>
              <div className="text-center">
                <Typography variant="h5" className="font-bold">{user.email}</Typography>
                <Typography variant="body2" className="text-foreground/40">ID: {user.uid}</Typography>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/60 ml-1">Nombre Completo</label>
                <TextField
                  fullWidth
                  placeholder={t("settings.first_name")}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  variant="outlined"
                  slotProps={{
                    input: {
                      className: "rounded-2xl bg-background/50"
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/60 ml-1">URL de la Foto</label>
                <TextField
                  fullWidth
                  placeholder="https://ejemplo.com/foto.jpg"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  variant="outlined"
                  slotProps={{
                    input: {
                      className: "rounded-2xl bg-background/50"
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button 
                onClick={handleSave} 
                className="premium-button min-w-[240px] flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {t("settings.save")}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 glass-effect rounded-3xl border border-white/10 opacity-60">
            <Typography variant="h6" className="mb-6">{t("settings.signin")}</Typography>
            <Link href="/signin">
              <button className="premium-button">Iniciar Sesión</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
