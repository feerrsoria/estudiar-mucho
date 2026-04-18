"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import FlippableCard from "../../components/Card";
import SkeletonCard from "../../components/ui/SkeletonCard";
import { createClient } from "../../lib/supabase/client";
import { saveFlashcards } from "../../actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "../../../locales/client";
import { User } from "@supabase/supabase-js";
import { Card } from "../../types";
import DatabaseService from "../../services/database";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

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
    const checkUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    checkUser();
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
    const loadingTimer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(loadingTimer);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft === 0);
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
      const scrollAmount = direction === "left" ? -300 : 300;
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

    const newCollection = await DatabaseService.createCollection({
      name: newCollectionName,
      user_id: user.id,
      file_name: fileName ?? undefined,
    });

    if (newCollection && newCollection.id) {
      const cardsWithCollection = questions.map((card) => ({
        ...card,
        collection_id: newCollection.id,
      }));

      const { error } = await saveFlashcards(cardsWithCollection);

      if (error) {
        alert(error);
      } else {
        alert(`${t("generate.saved.success")}${newCollectionName}`);
        router.push("/collections");
      }
    }
  };

  return (
    <>
    <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{t("generate.title")}</h1>
         
          <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            {t("generate.save")}
          </button>
        
      </div>
      <div className="flex-grow flex items-center justify-center">
        {loading ? (
          <SkeletonCard />
        ) : (
          Array.isArray(questions) &&
          questions.length > 0 && <FlippableCard {...questions[selectedCard]} size="large" />
        )}
      </div>
      <div className="w-full max-w-5xl relative">
        {isScrollable && !isAtStart && (
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 p-2 rounded-full shadow-md">
            <ChevronLeft />
          </button>
        )}
        <div ref={scrollContainerRef} onScroll={handleScroll} className="w-full overflow-x-auto whitespace-nowrap py-4 no-scrollbar">
          <div className="flex gap-4">
            {loading
              ? Array.from(new Array(5)).map((_, index) => <SkeletonCard key={index} />)
              : Array.isArray(questions) &&
                questions.map((card, index) => (
                  <div key={index} onClick={() => setSelectedCard(index)} className="cursor-pointer">
                    <FlippableCard {...card} size="small" isSelectable={true} isSelected={selectedCard === index} />
                  </div>
                ))}
          </div>
        </div>
        {isScrollable && !isAtEnd && (
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-black/80 p-2 rounded-full shadow-md">
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{t("generate.collection.title")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("generate.collection.name")}
          type="text"
          fullWidth
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => { handleSave(); setOpen(false); }}>Save</Button>
      </DialogActions>
    </Dialog>
  </>
  );
}
