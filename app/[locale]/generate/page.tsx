"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import FlippableCard from "../../components/Card";
import SkeletonCard from "../../components/ui/SkeletonCard";
import { saveFlashcards } from "../../actions";
import { ChevronLeft, ChevronRight, Save, Sparkles } from "lucide-react";
import { useI18n } from "../../../locales/client";
import { User } from "firebase/auth";
import { Card } from "../../types";
import AuthService from "../../services/auth";
import DatabaseService from "../../services/database";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from "@mui/material";

export default function GeneratePage() {
  const [questions, setQuestions] = useState<Card[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const router = useRouter();
  const t = useI18n();
  const [open, setOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
    });

    const loadQuestions = () => {
      const storedQuestions = localStorage.getItem("questions");
      const storedFileName = localStorage.getItem("fileName");
      if (storedQuestions) {
        try {
          const parsedQuestions = JSON.parse(storedQuestions);
          if (Array.isArray(parsedQuestions)) {
            setQuestions(parsedQuestions);
            setFileName(storedFileName);
          }
        } catch (error) {
          console.error("Error parsing questions from local storage", error);
        }
      }
    };

    loadQuestions();
    const loadingTimer = setTimeout(() => setLoading(false), 800);
    
    return () => {
      unsubscribe();
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  }, []);

  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsScrollable(scrollWidth > clientWidth);
      handleScroll();
    }
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [checkScrollability]);

  useEffect(() => {
    checkScrollability();
  }, [questions, loading, checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSave = async () => {
    if (!user) {
      localStorage.setItem("flashcards-to-save", JSON.stringify(questions));
      router.push("/signin?redirect_uri=/generate");
      return;
    }

    if (!newCollectionName) return;

    try {
      const newCollection = await DatabaseService.createCollection({
        name: newCollectionName,
        user_id: user.uid,
        file_name: fileName ?? undefined,
      });

      if (newCollection && newCollection.id) {
        const cardsWithCollection = questions.map((card) => ({
          ...card,
          user_id: user.uid,
          collection_id: newCollection.id,
        }));

        const { error } = await saveFlashcards(cardsWithCollection);

        if (error) {
          alert(error);
        } else {
          router.push("/collections");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="min-h-[calc(100-72px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-3">
              <Sparkles className="text-primary animate-pulse" />
              {t("generate.title")}
            </h1>
            <p className="text-foreground/60 text-lg">
              {fileName ? `Basado en: ${fileName}` : "Tus flashcards generadas"}
            </p>
          </div>
          
          <button 
            onClick={() => setOpen(true)} 
            className="premium-button flex items-center gap-2 group"
          >
            <Save size={20} className="group-hover:scale-110 transition-transform" />
            {t("generate.save")}
          </button>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="w-full max-w-2xl flex items-center justify-center min-h-[400px]">
            {loading ? (
              <div className="animate-pulse scale-110">
                <SkeletonCard />
              </div>
            ) : (
              questions.length > 0 && (
                <div className="transition-all duration-500 ease-out transform scale-110 hover:scale-[1.12]">
                  <FlippableCard {...questions[selectedCard]} size="large" />
                </div>
              )
            )}
          </div>

          <div className="w-full relative px-12 group/scroll">
            {isScrollable && !isAtStart && (
              <IconButton 
                onClick={() => scroll("left")} 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 glass-effect p-3 hover:bg-primary/20 transition-all opacity-0 group-hover/scroll:opacity-100"
              >
                <ChevronLeft />
              </IconButton>
            )}
            
            <div 
              ref={scrollContainerRef} 
              onScroll={handleScroll} 
              className="w-full overflow-x-auto whitespace-nowrap py-8 no-scrollbar scroll-smooth"
            >
              <div className="flex gap-6 px-4">
                {loading
                  ? Array.from(new Array(5)).map((_, index) => <SkeletonCard key={index} />)
                  : questions.map((card, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedCard(index)} 
                        className={`cursor-pointer transition-all duration-300 transform ${
                          selectedCard === index ? 'scale-105 -translate-y-2' : 'hover:scale-102'
                        }`}
                      >
                        <FlippableCard 
                          {...card} 
                          size="small" 
                          isSelectable={true} 
                          isSelected={selectedCard === index} 
                        />
                      </div>
                    ))}
              </div>
            </div>

            {isScrollable && !isAtEnd && (
              <IconButton 
                onClick={() => scroll("right")} 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 glass-effect p-3 hover:bg-primary/20 transition-all opacity-0 group-hover/scroll:opacity-100"
              >
                <ChevronRight />
              </IconButton>
            )}
          </div>
        </div>
      </div>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            className: "glass-effect rounded-2xl p-4 min-w-[320px]"
          }
        }}
      >
        <DialogTitle className="text-2xl font-bold">{t("generate.collection.title")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("generate.collection.name")}
            type="text"
            fullWidth
            variant="outlined"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            slotProps={{
              input: {
                className: "mt-2"
              }
            }}
          />
        </DialogContent>
        <DialogActions className="p-4 gap-2">
          <Button onClick={() => setOpen(false)} className="text-foreground/60">Cancel</Button>
          <Button 
            onClick={() => { handleSave(); setOpen(false); }}
            variant="contained"
            className="premium-button !py-2 !px-6"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
