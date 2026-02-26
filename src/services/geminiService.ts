import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

export const analyzeFashionItem = async (base64Image: string) => {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to analyze image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing fashion item:", error);
    throw error;
  }
};

export const getStylistResponse = async (message: string, contextImage?: string) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, image: contextImage }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get stylist response");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error getting stylist response:", error);
    return "I apologize, but I'm having trouble connecting to my fashion database right now.";
  }
};

export const saveToWardrobe = async (item: any) => {
  try {
    const response = await fetch("/api/wardrobe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving to wardrobe:", error);
  }
};

export const getWardrobe = async () => {
  try {
    const response = await fetch("/api/wardrobe");
    return await response.json();
  } catch (error) {
    console.error("Error getting wardrobe:", error);
    return [];
  }
};

export const toggleFavorite = async (id: string, isFavorite: boolean) => {
  try {
    const response = await fetch(`/api/wardrobe/${id}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};

export const deleteFromWardrobe = async (id: string) => {
  try {
    const response = await fetch(`/api/wardrobe/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting from wardrobe:", error);
  }
};
