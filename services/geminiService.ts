
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getCarSuggestions = async (budget: number, needs: string, location?: { lat: number; lng: number }) => {
  const ai = getAIClient();
  
  const contents = `I have a budget of $${budget}. My needs are: ${needs}. 
  Suggest 3-5 cars that fit this profile. Also mention if there are reputable dealers nearby.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: location ? { latitude: location.lat, longitude: location.lng } : undefined
        }
      }
    }
  });

  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const getBudgetingPlan = async (currentCar: string, targetBudget: number) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Help me create a budgeting plan to upgrade from my current ${currentCar} to a car around $${targetBudget}. Suggest savings strategies and trade-in considerations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          savingsPlan: { type: Type.STRING },
          tradeInEstimate: { type: Type.STRING },
          timeline: { type: Type.STRING },
          tips: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["savingsPlan", "tradeInEstimate", "timeline", "tips"]
      }
    }
  });
  
  return JSON.parse(response.text || "{}");
};
