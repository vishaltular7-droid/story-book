import { GoogleGenAI, Type } from "@google/genai";
import { ArtStyle, StoryContext } from "../types";

// Initialize the client
// Using a getter to ensure we grab the key if it's set later in the session (though env is standard)
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

export const transformImageWithAI = async (base64Image: string, style: ArtStyle): Promise<string> => {
  const ai = getAiClient();
  const mimeType = "image/png"; // Assuming PNG/JPEG from upload, handled as generic image input
  
  // Clean base64 string if it has prefix
  const cleanBase64 = base64Image.split(',')[1] || base64Image;

  const prompt = `Transform this image into a high-quality illustration in the style of "${style}". 
  Maintain the core composition, subjects, and emotion, but completely redraw it in the chosen art style. 
  Make it look like a finished piece of art suitable for a storybook.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt
          },
          {
            inlineData: {
              mimeType,
              data: cleanBase64
            }
          }
        ]
      },
      // Config to encourage image output if possible, though standard generateContent usually returns text unless specific model is used.
      // However, gemini-2.5-flash-image is multimodal. If it returns an image, it will be in inlineData.
    });

    // Check for image in response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    
    // Fallback: If no image returned (some models might just describe it if not triggered correctly), 
    // we might need to handle this. For this demo, we assume the model works as intended for image editing.
    // If we get text back instead, we throw an error to the UI.
    throw new Error("The AI provided a description instead of an image. Please try again.");

  } catch (error) {
    console.error("Image transformation error:", error);
    throw error;
  }
};

export const generateStoryWithAI = async (context: StoryContext, style: ArtStyle): Promise<{ title: string; content: string }> => {
  const ai = getAiClient();
  
  const prompt = `You are a master storyteller writing for a "Relation Book" - a book that cherishes personal connections.
  
  Write a short, emotional, and engaging narrative chapter based on the following context provided by the user about a memory:
  - Who is in the photo: ${context.who}
  - What is happening: ${context.what}
  - Why it is important: ${context.why}
  - Emotions/Memories: ${context.emotions}

  The visual style chosen for this memory is "${style}". The writing style should subtly reflect this (e.g., whimsical for Disney/Pixar, epic for Cinematic, gentle for Watercolor).
  
  Structure the response as a JSON object with:
  1. "title": A creative title for the chapter.
  2. "content": The story body (approx 200-300 words). Use markdown for formatting if needed.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
          },
          required: ["title", "content"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Story generation error:", error);
    throw error;
  }
};
