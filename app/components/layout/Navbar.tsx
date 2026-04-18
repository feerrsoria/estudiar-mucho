"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X, Sun, Moon, Monitor } from "lucide-react";
import { useI18n, useChangeLocale, useCurrentLocale } from "../../../locales/client";
import ReactFlagsSelect from "react-flags-select";
import { useTheme } from "next-themes";
import AuthService from "../../services/auth";
import { User } from "@supabase/supabase-js";
import { Button, Menu, MenuItem } from "@mui/material";

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

  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-2" suppressHydrationWarning={true}>
      <Link href="/" className="text-2xl font-bold">
        {t("home.title")}
      </Link>
      <div className="hidden md:flex items-center gap-4">
        <ReactFlagsSelect
          selected={locale === "en" ? "GB" : "AR"}
          onSelect={(code) => changeLocale(code === "GB" ? "en" : "es")}
          countries={["GB", "AR"]}
          customLabels={{ GB: "EN", AR: "ES" }}
          placeholder="Select Language"
        />
        {mounted && (
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
            className="p-2 rounded-md"
          >
            {theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <Monitor />}
          </button>
        )}
        {user ? (
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              {t("navbar.profile")}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => setAnchorEl(null)} component={Link} href="/profile">
                {t("navbar.settings")}
              </MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)} component={Link} href="/collections">
                {t("navbar.my_collections")}
              </MenuItem>
              <MenuItem onClick={() => { setAnchorEl(null); AuthService.signOut(); }}>
                {t("navbar.signout")}
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link href="/signin">
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              {t("navbar.signin")}
            </button>
          </Link>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <MenuIcon />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black flex flex-col items-center gap-4 p-4 md:hidden">
          <ReactFlagsSelect
            selected={locale === "en" ? "GB" : "AR"}
            onSelect={(code) => {
              changeLocale(code === "GB" ? "en" : "es");
              setIsOpen(false);
            }}
          countries={["GB", "AR"]}
          customLabels={{ GB: "EN", AR: "ES" }}
          placeholder="Select Language"
          />
          {mounted && (
            <button
              onClick={() => {
                setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
                setIsOpen(false);
              }}
              className="p-2 rounded-md"
            >
              {theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <Monitor />}
            </button>
          )}
          {user ? (
            <div>
              <Link href="/profile">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors w-full">
                  {t("navbar.profile")}
                </button>
              </Link>
              <button onClick={() => { setIsOpen(false); AuthService.signOut(); }} className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors w-full mt-2">
                {t("navbar.signout")}
              </button>
            </div>
          ) : (
            <Link href="/signin">
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors w-full">
                {t("navbar.signin")}
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
