import { GoogleGenAI } from "@google/genai";
import { LogEntry } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize safely. If no key, we will handle it gracefully in the UI.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateSafetyInsight = async (logs: LogEntry[]): Promise<string> => {
  if (!ai) {
    return "Demo Mode: Configure API_KEY to enable real AI insights. Currently showing a simulation: Everything looks safe, but watch out for the unknown SMS link.";
  }

  try {
    const logsText = logs.map(l => 
      `[${l.type}] ${l.title}: ${l.description} (${l.timestamp})`
    ).join('\n');

    const prompt = `
      You are a parental control AI assistant named Radhe AI.
      Analyze the following activity logs from a child's phone (App name: Ravi).
      Identify any potential safety concerns (like spam links, unknown callers, or excessive usage).
      Provide a concise, reassuring summary for the parent in 2-3 sentences.
      
      Logs:
      ${logsText}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insights available at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate insight right now. Please try again later.";
  }
};