"use client";

import { useState } from "react";
import AuthService from "../../services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "../../../locales/client";
import I18nLink from "../../components/i18n-link";
import { LogIn, Mail, Lock, Globe } from "lucide-react";
import { TextField, InputAdornment } from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignIn = async () => {
    const user = await AuthService.signIn(email, password);
    if (user) {
      const redirectUri = searchParams.get("redirect_uri");
      router.push(redirectUri || "/profile");
    } else {
      alert("Credenciales inválidas");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await AuthService.signInWithGoogle();
      const redirectUri = searchParams.get("redirect_uri");
      router.push(redirectUri || "/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 glass-effect p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-2">
            <LogIn size={32} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {t("signin.title")}
          </h2>
          <p className="text-foreground/60">Bienvenido de nuevo</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <TextField
              fullWidth
              label={t("signin.email")}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} className="text-foreground/40" />
                    </InputAdornment>
                  ),
                  className: "rounded-2xl bg-background/50"
                }
              }}
            />
            <TextField
              fullWidth
              label={t("signin.password")}
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} className="text-foreground/40" />
                    </InputAdornment>
                  ),
                  className: "rounded-2xl bg-background/50"
                }
              }}
            />
          </div>

          <button
            type="submit"
            onClick={handleSignIn}
            className="premium-button w-full flex items-center justify-center gap-2 py-3"
          >
            {t("signin.title")}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-foreground/40">O continúa con</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-semibold"
        >
          <Globe size={20} className="text-red-500" />
          Google
        </button>

        <div className="text-center pt-4">
          <I18nLink 
            href="/signup" 
            i18nKey="signin.noaccount" 
            className="text-primary hover:underline font-medium" 
          />
        </div>
      </div>
    </div>
  );
}
