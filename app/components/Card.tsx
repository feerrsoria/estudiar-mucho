
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

  const sizeClasses = size === "large" ? "w-full sm:w-80 h-96" : "w-40 sm:w-40 h-56";
  const selectedClass = isSelected ? "ring-2 ring-blue-400" : "";

  const handleClick = () => {
    if (!isSelectable) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={`${sizeClasses} perspective-1000 ${selectedClass}`}
      onClick={handleClick}
    >
      <div
        className={`w-full h-full relative transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""} shadow-lg hover:shadow-2xl transition-shadow`}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Card className="w-full h-full">
            <CardContent>
              {size === "large" && (
                <>
                  <Typography variant="h6" component="div" className="text-lg sm:text-xl">
                    {title}
                  </Typography>
                  {subtitle && (
                    <Typography variant="caption" color="text.secondary">
                      {subtitle}
                    </Typography>
                  )}
                </>
              )}
              <Typography
                variant={size === "large" ? "body1" : "body2"}
                className="mt-4 whitespace-normal break-words text-sm sm:text-base"
              >
                {question}
              </Typography>
              <Typography variant="caption" className="absolute bottom-2 right-2">
                Page: {page}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <Card className="w-full h-full">
            <CardContent>
              <Typography variant="body1">{answer}</Typography>
              <Typography variant="caption" className="absolute bottom-2 right-2">
                Page: {page}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
