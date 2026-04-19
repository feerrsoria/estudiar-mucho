                        "use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import FlippableCard from "../../../components/Card";
import SkeletonCard from "../../../components/ui/SkeletonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "../../../../locales/client";
import { User } from "firebase/auth";
import { Card } from "../../../types";
import AuthService from "../../../services/auth";
import DatabaseService, { Collection } from "../../../services/database";
import { IconButton } from "@mui/material";

export default function StudyPage() {
  const params = useParams();
  const collectionId = params.collectionId as string;
  const [cards, setCards] = useState<Card[]>([]);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const router = useRouter();
  const t = useI18n();

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
    });

    async function loadCards() {
      if (!collectionId) return;
      const fetchedCards = await DatabaseService.getCards(collectionId);
      const fetchedCollection = await DatabaseService.getCollection(collectionId);
      setCards(fetchedCards);
      setCollection(fetchedCollection);
      setLoading(false);
    }

    loadCards();
    
    return () => {
      unsubscribe();
    };
  }, [collectionId]);

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
  }, [cards, loading, checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[calc(100-72px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-3">
              {collection?.name || "Study Session"}
            </h1>
            <p className="text-foreground/60 text-lg">
              {collection?.file_name ? `Basado en: ${collection.file_name}` : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="w-full max-w-2xl flex items-center justify-center min-h-[400px]">
            {loading ? (
              <div className="animate-pulse scale-110">
                <SkeletonCard />
              </div>
            ) : (
              cards.length > 0 && (
                <div className="transition-all duration-500 ease-out transform scale-110 hover:scale-[1.12]">
                  <FlippableCard {...cards[selectedCard]} size="large" />
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
                  : cards.map((card, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedCard(index)} 
                        className={`cursor-pointer transition-all duration-300 transform ${
                          selectedCard === index ? 'scale-105 -translate-y-2' : 'hover:scale-102'
                        }`}>
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
    </div>
  );
}
