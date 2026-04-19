
"use client";

import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface CardProps {
  question: string;
  answer: string;
  page: number;
  title: string;
  subtitle?: string;
  size?: "small" | "large";
  isSelectable?: boolean;
  isSelected?: boolean;
}

export default function FlippableCard({ question, answer, page, title, subtitle, size = "large", isSelectable = false, isSelected = false }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const sizeClasses = size === "large" ? "w-full min-w-[280px] sm:w-80 h-80 sm:h-96" : "w-36 sm:w-40 h-48 sm:h-56";
  const selectedClass = isSelected ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20" : "";

  const handleClick = () => {
    if (!isSelectable) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={`${sizeClasses} perspective-1000 ${selectedClass} transition-all duration-300 mx-auto`}
      onClick={handleClick}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 transform-style-preserve-3d"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Card className="w-full h-full rounded-2xl overflow-hidden border border-white/10 glass-effect">
            <CardContent className="h-full flex flex-col p-6 text-center">
              {size === "large" && (
                <div className="mb-4">
                  <Typography variant="h6" component="div" className="text-lg sm:text-xl font-bold text-foreground opacity-80 line-clamp-2">
                    {title}
                  </Typography>
                  {subtitle && (
                    <Typography variant="caption" color="textSecondary" className="block mt-1">
                      {subtitle}
                    </Typography>
                  )}
                </div>
              )}
              <div className="flex-grow flex items-center justify-center overflow-y-auto no-scrollbar min-h-0 py-4">
                <Typography
                  className={`${size === "large" ? "text-base sm:text-xl" : "text-xs"} whitespace-normal break-words font-medium px-2 text-foreground leading-relaxed`}
                >
                  {question}
                </Typography>
              </div>
              <Typography variant="caption" className="mt-4 font-mono text-foreground opacity-50 block text-right w-full">
                Page {page}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <Card className="w-full h-full rounded-2xl overflow-hidden border border-white/10 glass-effect">
            <CardContent className="h-full flex flex-col p-6 text-center bg-primary/5">
              <div className="flex-grow flex items-center justify-center overflow-y-auto no-scrollbar min-h-0 py-4">
                <Typography 
                  className={`${size === "large" ? "text-base sm:text-xl" : "text-xs"} font-medium px-2 text-foreground leading-relaxed`}
                >
                  {answer}
                </Typography>
              </div>
              <Typography variant="caption" className="mt-4 font-mono text-foreground opacity-50 block text-right w-full">
                Page {page}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
