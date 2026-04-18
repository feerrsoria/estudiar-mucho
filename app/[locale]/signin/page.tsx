
"use client";

import { useState } from "react";
import AuthService from "../../services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "../../../locales/client";
import I18nLink from "../../components/i18n-link";

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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-light dark:bg-gray-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("signin.title")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("signin.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("signin.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSignIn}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              style={{ backgroundColor: '#2c6df9' }}
            >
              {t("signin.title")}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          <div className="px-2 text-sm text-gray-600 dark:text-gray-400">Or</div>
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div>
          <button
            onClick={() => AuthService.signInWithGoogle()}
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {t("signin.google")}
          </button>
        </div>
        <div className="text-sm text-center">
          <I18nLink href="/signup" i18nKey="signin.noaccount" />
        </div>
      </div>
    </div>
  );
}
