"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseFile } from "../../actions";
import { useI18n } from "../../../locales/client";
import { Upload, Sparkles, FileText, Send, Loader2 } from "lucide-react";
import { TextField, InputAdornment } from "@mui/material";

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
      const { text, fileName } = await parseFile(file);
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          text, 
          userInstructions: prompt
        }),
      });

       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      localStorage.setItem("questions", JSON.stringify(data.questions));
      localStorage.setItem("fileName", fileName);
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
    <div className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />

      <div className="text-center space-y-8 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/20 text-primary text-sm font-bold animate-bounce">
          <Sparkles size={16} />
          {t("hero.badge") || "Inteligencia Artificial para Estudiantes"}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          {t("hero.title").split(" ").map((word, i) => (
            <span key={i} className={i % 2 === 1 ? "bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent" : ""}>
              {word}{" "}
            </span>
          ))}
        </h1>
        
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>
      </div>

      <div className="mt-16 w-full max-w-2xl glass-effect p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl space-y-8">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold text-foreground/60 ml-1">
            <FileText size={18} />
            {t("hero.file.label")}
          </label>
          <div className="relative group">
            <input 
              type="file" 
              onChange={handleFileChange} 
              id="file-upload"
              className="hidden" 
            />
            <label 
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/20 rounded-3xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className={`w-10 h-10 mb-3 ${file ? 'text-green-500' : 'text-primary'} group-hover:scale-110 transition-transform`} />
                <p className="text-sm font-semibold">
                  {file ? file.name : "Selecciona o arrastra un archivo"}
                </p>
                <p className="text-xs text-foreground/40 mt-1">PDF, DOCX, PPTX o TXT</p>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold text-foreground/60 ml-1">
            <Send size={18} />
            {t("hero.prompt.label")}
          </label>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t("hero.prompt.placeholder")}
            variant="outlined"
            slotProps={{
              input: {
                className: "rounded-3xl bg-background/50 border-white/10 p-4"
              }
            }}
          />
        </div>

        <div className="pt-4">
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="premium-button w-full flex items-center justify-center gap-3 py-4 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                {t("hero.submit.loading")}
              </>
            ) : (
              <>
                <Sparkles size={20} />
                {t("hero.submit.button")}
              </>
            )}
          </button>
          
          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}