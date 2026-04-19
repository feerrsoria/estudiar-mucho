"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X, Sun, Moon, Monitor, User as UserIcon } from "lucide-react";
import { useI18n, useChangeLocale, useCurrentLocale } from "../../../locales/client";
import ReactFlagsSelect from "react-flags-select";
import { useTheme } from "next-themes";
import AuthService from "../../services/auth";
import { User } from "firebase/auth";
import { Button, Menu, MenuItem, Avatar, IconButton, Tooltip } from "@mui/material";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    AuthService.onAuthStateChanged(setUser);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full glass-effect px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-lg">
      <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
        Estudiar Mucho
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Tooltip title={t("navbar.language")} arrow>
            <ReactFlagsSelect
              selected={locale === "en" ? "GB" : "AR"}
              onSelect={(code) => changeLocale(code === "GB" ? "en" : "es")}
              countries={["GB", "AR"]}
              customLabels={{ GB: "EN", AR: "ES" }}
              placeholder="Language"
              className="premium-flags"
            />
          </Tooltip>
        </div>

        <Tooltip title={t("navbar.theme")} arrow>
          <IconButton
            onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
            className="text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {theme === "light" ? <Sun size={20} /> : theme === "dark" ? <Moon size={20} /> : <Monitor size={20} />}
          </IconButton>
        </Tooltip>

        {user ? (
          <div className="flex items-center gap-3">
            <Button component={Link} href="/collections" variant="contained" color="primary" className="premium-button">
              {t("navbar.my_collections")}
            </Button>
            <Tooltip title={t("navbar.profile")} arrow>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar 
                  src={user.photoURL || undefined} 
                  className="w-9 h-9 border-2 border-primary/20"
                >
                  {!user.photoURL && <UserIcon size={18} />}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              slotProps={{
                paper: {
                  className: "glass-effect mt-2 min-w-[180px] rounded-xl border border-white/10"
                }
              }}
            >
              <MenuItem onClick={() => setAnchorEl(null)} component={Link} href="/profile" className="py-2.5 px-4 hover:bg-primary/10 rounded-lg mx-1">
                {t("navbar.settings")}
              </MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)} component={Link} href="/collections" className="py-2.5 px-4 hover:bg-primary/10 rounded-lg mx-1">
                {t("navbar.my_collections")}
              </MenuItem>
              <hr className="my-1 border-white/10" />
              <MenuItem onClick={() => { setAnchorEl(null); AuthService.signOut(); }} className="py-2.5 px-4 text-red-500 hover:bg-red-500/10 rounded-lg mx-1">
                {t("navbar.signout")}
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link href="/signin">
            <button className="premium-button">
              {t("navbar.signin")}
            </button>
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center gap-4">
        <IconButton
          onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
          className="text-foreground"
        >
          {theme === "light" ? <Sun size={20} /> : theme === "dark" ? <Moon size={20} /> : <Monitor size={20} />}
        </IconButton>
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full glass-effect flex flex-col items-center gap-6 p-8 md:hidden animate-in slide-in-from-top-4 duration-300">
          <ReactFlagsSelect
            selected={locale === "en" ? "GB" : "AR"}
            onSelect={(code) => {
              changeLocale(code === "GB" ? "en" : "es");
              setIsOpen(false);
            }}
            countries={["GB", "AR"]}
            customLabels={{ GB: "EN", AR: "ES" }}
          />
          
          {user ? (
            <div className="flex flex-col gap-4 w-full">
              <Link href="/profile" className="w-full" onClick={() => setIsOpen(false)}>
                <button className="w-full py-3 rounded-xl bg-primary/10 font-semibold">{t("navbar.profile")}</button>
              </Link>
              <Link href="/collections" className="w-full" onClick={() => setIsOpen(false)}>
                <button className="w-full py-3 rounded-xl bg-primary/10 font-semibold">{t("navbar.my_collections")}</button>
              </Link>
              <button 
                onClick={() => { setIsOpen(false); AuthService.signOut(); }} 
                className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 font-semibold"
              >
                {t("navbar.signout")}
              </button>
            </div>
          ) : (
            <Link href="/signin" className="w-full" onClick={() => setIsOpen(false)}>
              <button className="premium-button w-full">
                {t("navbar.signin")}
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
