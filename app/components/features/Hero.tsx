"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseFile } from "../../actions";
import { useI18n } from "../../../locales/client";

export default function Hero() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useI18n();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError(t("hero.error.no-file"));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const text = await parseFile(file);
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          text, 
          userInstructions: prompt // Enviamos el prompt como instrucciones personalizadas
        }),
      });

       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      localStorage.setItem("questions", JSON.stringify(data.questions));
      router.push("/generate");
    } catch (error) {
      if (error instanceof Error) {
        setError(`${t("hero.error.general")}${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-5xl font-bold">{t("hero.title")}</h1>
      <p className="text-xl text-gray-500 mt-4 max-w-2xl">
        {t("hero.subtitle")}
      </p>
      
      <div className="mt-8 w-full max-w-md flex flex-col gap-4">
        <div className="flex flex-col text-left">
          <label className="text-sm font-medium text-gray-700 mb-1">{t("hero.file.label")}</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white" 
          />
        </div>

        <div className="flex flex-col text-left">
          <label className="text-sm font-medium text-gray-700 mb-1">{t("hero.prompt.label")}</label>
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder={t("hero.prompt.placeholder")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 resize-none" 
          />
        </div>

        <button 
          onClick={handleSubmit} 
          className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400" 
          disabled={loading}
        >
          {loading ? t("hero.submit.loading") : t("hero.submit.button")}
        </button>

        {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
      </div>
    </div>
  );
}