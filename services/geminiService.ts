import { GoogleGenAI, Type } from "@google/genai";
import { GeminiDiagnosisResponse, WorkerCategory } from "./types";

const initGenAI = () => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API Key is missing. Please ensure process.env.API_KEY is configured.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const diagnoseProblem = async (problemDescription: string): Promise<GeminiDiagnosisResponse | null> => {
  const ai = initGenAI();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `I have a home maintenance problem: "${problemDescription}". 
      Diagnose the issue, identify the professional category needed (Plumber, Gardener, Carpenter, Painter, Electrician, Arts & Crafts, or Others), 
      provide a short safety tip, and a suggested immediate action.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              enum: [
                WorkerCategory.PLUMBER,
                WorkerCategory.GARDENER,
                WorkerCategory.CARPENTER,
                WorkerCategory.PAINTER,
                WorkerCategory.ELECTRICIAN,
                WorkerCategory.ARTS_CRAFTS,
                WorkerCategory.OTHER
              ],
              description: "The most suitable worker category for the problem."
            },
            safetyTip: {
              type: Type.STRING,
              description: "A crucial safety tip related to the problem."
            },
            reasoning: {
              type: Type.STRING,
              description: "Brief explanation of why this category was chosen."
            },
            suggestedAction: {
              type: Type.STRING,
              description: "Immediate action the user should take before the pro arrives."
            }
          },
          required: ["category", "safetyTip", "reasoning", "suggestedAction"],
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as GeminiDiagnosisResponse;

  } catch (error) {
    console.error("Error diagnosing problem:", error);
    return null;
  }
};