"use server";

import mammoth from "mammoth";
import JSZip from "jszip";
import databaseService from "./services/database";
import { Card } from "./types";

export async function saveFlashcards(cards: Card[]) {
  try {
    const results = await Promise.all(
      cards.map(card => databaseService.createCard(card))
    );
    return { data: results };
  } catch (error) {
    console.error("Error saving flashcards:", error);
    return { error: "Failed to save flashcards" };
  }
}

export async function parseFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = file.name;

  try {
    if (file.type === "application/pdf") {
      const pdf = (await import("pdf-parse-fork")).default;
      const data = await pdf(buffer);
      return { text: data.text.trim(), fileName };
    } 
    
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const { value } = await mammoth.extractRawText({ buffer });
      return { text: value.trim(), fileName };
    } 

    if (file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
      const zip = await JSZip.loadAsync(buffer);
      const slideFiles = Object.keys(zip.files)
        .filter(key => key.startsWith("ppt/slides/slide") && key.endsWith(".xml"))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      const slideTexts = await Promise.all(
        slideFiles.map(async (key) => {
          const content = await zip.files[key].async("text");
          const textNodes = content.match(/<a:t>([\s\S]*?)<\/a:t>/g) || [];
          return textNodes.map(node => node.replace(/<\/?a:t>/g, "")).join(" ");
        })
      );
      return { text: slideTexts.join("\n").trim(), fileName };
    } 

    return { text: buffer.toString("utf-8").trim(), fileName };

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error parsing file:", error.message);
    }
    throw new Error("Could not extract text from file");
  }
}
