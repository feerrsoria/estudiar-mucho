"use server";

import mammoth from "mammoth";
import JSZip from "jszip";
import { createClient } from "./lib/supabase/server";

import { Card } from "./types";

export async function saveFlashcards(cards: Card[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase.from("cards").insert(
      cards.map(card => ({ ...card, user_id: user.id }))
    );
    if (error) {
      console.error("Error saving flashcards:", error);
      return { error };
    }
    return { data };
  }
  return { error: "User not authenticated" };
}

export async function parseFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    if (file.type === "application/pdf") {
      const pdf = (await import("pdf-parse-fork")).default;
      const data = await pdf(buffer);
      return data.text.trim();
    } 
    
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const { value } = await mammoth.extractRawText({ buffer });
      return value.trim();
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
      return slideTexts.join("\n").trim();
    } 

    return buffer.toString("utf-8").trim();

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error parseando archivo:", error.message);
    }
    throw new Error("No se pudo extraer el texto del archivo");
  }
}