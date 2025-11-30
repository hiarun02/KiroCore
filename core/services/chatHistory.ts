import {Message} from "@/core/types/message";

const PREFIX = "kirocore_chat_";

export function saveChatHistory(appType: string, messages: Message[]): void {
  try {
    localStorage.setItem(`${PREFIX}${appType}`, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save chat history:", error);
  }
}

export function loadChatHistory(appType: string): Message[] {
  try {
    const saved = localStorage.getItem(`${PREFIX}${appType}`);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as Message[];
    return parsed.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch {
    return [];
  }
}

export function clearChatHistory(appType: string): void {
  try {
    localStorage.removeItem(`${PREFIX}${appType}`);
  } catch (error) {
    console.error("Failed to clear chat history:", error);
  }
}

export function clearAllChatHistories(): void {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Failed to clear all histories:", error);
  }
}
