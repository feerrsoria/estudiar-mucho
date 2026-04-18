import { createVertex } from '@ai-sdk/google-vertex';
import { generateObject } from 'ai'; 
import { z } from 'zod'; 

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;

const vertex = createVertex({
  project: GCP_PROJECT_ID,
  location: 'us-central1',
});

export const POST = async (req: Request) => {
  try {
    const { text, userInstructions } = await req.json();

    const { object } = await generateObject({
      model: vertex("gemini-2.5-flash"), 
      schema: z.object({
        questions: z.array(z.object({
          question: z.string(),
          answer: z.string(),
          page: z.string().or(z.number()).nullable(),
          title: z.string(),
          subtitle: z.string(),
        })),
      }),
      prompt: `
        Analyze the provided text and follow the user's custom instructions to generate study flashcards.

        STRICT INSTRUCTIONS:
        1. LANGUAGE: Generate the questions and answers in the SAME language as the input text.
        2. TRANSLATION: If (and only if) the user explicitly asks to translate to a specific language in the "User Instructions", ignore rule #1 and translate the output.
        3. FILTERING: If the user specifies certain chapters, pages, or sections in the "User Instructions", only use information from those parts of the text.
        4. FORMAT: Return a valid JSON array of questions.

        User Instructions: ${userInstructions || "None provided. Generate general cards from the content."}

        Input Text: 
        ${text.substring(0, 20000)}
      `,
      maxRetries: 3, 
    });


    return new Response(JSON.stringify(object), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en la generación:", error);
      const status = error.name === 'AI_RetryError' ? 429 : 500;
      return new Response(JSON.stringify({ 
        error: "Error al generar preguntas", 
        details: error.message 
      }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ 
      error: "Error al generar preguntas", 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
