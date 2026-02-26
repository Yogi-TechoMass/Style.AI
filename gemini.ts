import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

export const analyzeFashionItem = async (base64Image: string) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY is not set or is invalid.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";

  const prompt = `
    Analyze this fashion item and provide a detailed description in JSON format.
    Identify the following:
    - category (e.g., Shirt, Pants, Dress, Shoes, Jacket)
    - color (primary color)
    - pattern (e.g., Solid, Striped, Floral, Plaid)
    - style (e.g., Casual, Formal, Streetwear, Minimalist)
    - material (e.g., Cotton, Silk, Denim, Leather)
    - occasion (e.g., Office, Party, Casual, Wedding)
    
    Also, suggest 3 matching items to complete the outfit. For each matching item, provide:
    - name
    - category
    - why it matches
    - price (estimate in INR)
    - store (one of: Myntra, Amazon, Ajio, Flipkart)
    - matchScore (0-100)
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { text: prompt },
        {
          inlineData: {
            mimeType: base64Image.substring(base64Image.indexOf(":") + 1, base64Image.indexOf(";")) || "image/jpeg",
            data: base64Image.split(",")[1], // Remove the data:image/...;base64, prefix
          },
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          detectedItem: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              color: { type: Type.STRING },
              pattern: { type: Type.STRING },
              style: { type: Type.STRING },
              material: { type: Type.STRING },
              occasion: { type: Type.STRING },
            },
            required: ["category", "color", "style"],
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                whyItMatches: { type: Type.STRING },
                price: { type: Type.STRING },
                store: { type: Type.STRING },
                matchScore: { type: Type.NUMBER },
              },
              required: ["name", "category", "store", "matchScore"],
            },
          },
        },
        required: ["detectedItem", "recommendations"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const getStylistResponse = async (message: string, contextImage?: string) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY is not set or is invalid.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";

  const parts: any[] = [{ text: message }];
  if (contextImage) {
    parts.push({
      inlineData: {
        mimeType: contextImage.substring(contextImage.indexOf(":") + 1, contextImage.indexOf(";")) || "image/jpeg",
        data: contextImage.split(",")[1],
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      systemInstruction: "You are a world-class luxury fashion stylist. Provide concise, elegant, and professional advice. Use markdown for formatting.",
    },
  });

  return response.text;
};
