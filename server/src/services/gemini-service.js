import {GoogleGenerativeAI} from "@google/generative-ai";
import {getAppConfig} from "./app-service.js";

let genAI = null;

function getGeminiInstance() {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

export async function generateGeminiResponse({
  appType,
  message,
  conversationHistory = [],
}) {
  const gemini = getGeminiInstance();
  if (!gemini) {
    throw new Error("Gemini API key not configured");
  }

  const appConfig = await getAppConfig(appType);
  const systemPrompt =
    appConfig.systemPrompt || "You are a helpful AI assistant.";

  const model = gemini.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  const history = conversationHistory.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{text: msg.content}],
  }));

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
    },
  });

  const prompt = message;

  const result = await chat.sendMessage(prompt);
  const text = result.response.text();

  if (!text?.trim()) {
    throw new Error("Empty response from Gemini");
  }

  return {
    content: text,
    appType,
    timestamp: new Date().toISOString(),
    source: "gemini-ai",
  };
}
