"use client";

import { useState } from "react";
import AuthService from "../../services/auth";
import { useRouter } from "next/navigation";
import { useI18n } from "../../../locales/client";
import I18nLink from "../../components/i18n-link";
import { UserPlus, Mail, Lock } from "lucide-react";
import { TextField, InputAdornment } from "@mui/material";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useI18n();
  const router = useRouter();

  const handleSignUp = async () => {
    const user = await AuthService.signUp(email, password);
    if (user) {
      router.push("/profile");
    } else {
      alert("Error al crear la cuenta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 glass-effect p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-2">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {t("signup.title")}
          </h2>
          <p className="text-foreground/60">Únete a nosotros hoy</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <TextField
              fullWidth
              label={t("signup.email")}
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
              label={t("signup.password")}
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
            onClick={handleSignUp}
            className="premium-button w-full flex items-center justify-center gap-2 py-3"
          >
            {t("signup.title")}
          </button>
        </form>

        <div className="text-center pt-6">
          <I18nLink 
            href="/signin" 
            i18nKey="signup.haveaccount" 
            className="text-primary hover:underline font-medium"
          />
        </div>
      </div>
    </div>
  );
}
