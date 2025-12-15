import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, WeightLossPlan, LocalPlace } from "../types";

// Helper to get API key safely
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY not found in environment");
    return "";
  }
  return key;
};

const planSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: "A warm, encouraging summary of the plan tailored for 50+." },
    dailyCalories: { type: Type.INTEGER, description: "Recommended daily calorie intake." },
    proteinTarget: { type: Type.INTEGER, description: "Recommended daily protein in grams (crucial for 50+)." },
    motivationalQuote: { type: Type.STRING, description: "A classic, inspiring quote." },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 Specific tips for weight loss over 50 (e.g. metabolism, bone health)."
    },
    seasonalProduce: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 5-7 seasonal fruits and vegetables available in the user's location."
    },
    recommendedNutsSeeds: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 specific nuts and seeds beneficial for 50+ health (e.g. walnuts, chia)."
    },
    weeklyPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          breakfast: { type: Type.STRING },
          lunch: { type: Type.STRING },
          dinner: { type: Type.STRING },
          snack: { type: Type.STRING },
          exercise: { type: Type.STRING, description: "Age-appropriate exercise (e.g. walking, swimming, yoga)." },
          hydrationGoal: { type: Type.STRING }
        }
      }
    }
  },
  required: ["summary", "dailyCalories", "proteinTarget", "weeklyPlan", "tips", "motivationalQuote", "seasonalProduce", "recommendedNutsSeeds"]
};

export const generatePersonalizedPlan = async (profile: UserProfile): Promise<WeightLossPlan> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  const prompt = `
    Create a 7-day weight loss and wellness plan for a ${profile.age}-year-old ${profile.gender} living in ${profile.location}.
    Current weight: ${profile.currentWeight}lbs, Target: ${profile.targetWeight}lbs.
    Activity Level: ${profile.activityLevel}.
    Health notes: ${profile.healthConditions || 'None'}.

    CRITICAL CONTEXT FOR 50+:
    - Focus on metabolic health, muscle preservation (protein), and joint safety.
    - Tone: "Classic, Energetic, Trustworthy". Avoid slang. Be encouraging but scientific.
    - Suggest foods likely available in ${profile.location}.
    - Exercises should be low impact but effective (walking, resistance bands, swimming).
    
    MANDATORY INCLUSIONS:
    1. SEASONAL PRODUCE: Identify fruits and vegetables currently in season for ${profile.location}.
    2. NUTS & SEEDS: Explicitly include healthy fats like walnuts, almonds, chia seeds, flaxseeds, etc., which are vital for aging brains and hearts.
    3. Ensure the weekly meal plan (WeeklyPlan) incorporates these specific seasonal items and nuts/seeds in the meals or snacks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
        systemInstruction: "You are a world-class senior fitness and nutrition specialist. Your goal is to help people over 50 reclaim their vitality."
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WeightLossPlan;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Plan generation error:", error);
    throw error;
  }
};

export interface LocalResourcesResponse {
  answer: string;
  places: LocalPlace[];
}

export const findLocalWellnessSpots = async (location: string, query: string): Promise<LocalResourcesResponse> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  const prompt = `Find top rated ${query} in or near ${location}. suitable for people over 50.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
            retrievalConfig: {
                latLng: {
                    latitude: 37.7749, // Default fallback if geolocation fails elsewhere, but usually maps tool handles query string well
                    longitude: -122.4194
                }
            }
        }
      }
    });

    const text = response.text || "I couldn't find specific places, but here are some general tips.";
    
    // Extract grounding chunks for maps
    const places: LocalPlace[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
        chunks.forEach(chunk => {
            if (chunk.web?.uri && chunk.web?.title) {
                 places.push({ title: chunk.web.title, uri: chunk.web.uri });
            }
        });
    }

    return { answer: text, places };

  } catch (error) {
    console.error("Local search error:", error);
    return { answer: "Unable to fetch local resources at the moment.", places: [] };
  }
};