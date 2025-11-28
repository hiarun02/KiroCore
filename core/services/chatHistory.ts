import {Message} from "@/core/types/message";

const STORAGE_PREFIX = "kirocore_chat_";

/**
 * Save chat history to localStorage
 */
export function saveChatHistory(appType: string, messages: Message[]): void {
  try {
    const key = `${STORAGE_PREFIX}${appType}`;
    const data = JSON.stringify(messages);
    localStorage.setItem(key, data);
    console.log(`[chatHistory] Saved ${messages.length} messages to ${key}`);
    console.log(`[chatHistory] Data size: ${data.length} bytes`);
  } catch (error) {
    console.error("[chatHistory] Failed to save chat history:", error);
  }
}

/**
 * Load chat history from localStorage
 */
export function loadChatHistory(appType: string): Message[] {
  try {
    const key = `${STORAGE_PREFIX}${appType}`;
    console.log(`[chatHistory] Loading from ${key}`);
    const saved = localStorage.getItem(key);

    if (!saved) {
      console.log(`[chatHistory] No saved data found for ${key}`);
      return [];
    }

    console.log(`[chatHistory] Found saved data: ${saved.length} bytes`);
    const parsed = JSON.parse(saved) as Message[];
    console.log(`[chatHistory] Parsed ${parsed.length} messages`);

    // Convert timestamp strings back to Date objects
    return parsed.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch (error) {
    console.error("[chatHistory] Failed to load chat history:", error);
    return [];
  }
}

/**
 * Clear chat history for a specific app
 */
export function clearChatHistory(appType: string): void {
  try {
    const key = `${STORAGE_PREFIX}${appType}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to clear chat history:", error);
  }
}

/**
 * Clear all chat histories
 */
export function clearAllChatHistories(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Failed to clear all chat histories:", error);
  }
}

/**
 * Get all app types with saved chat history
 */
export function getSavedChatApps(): string[] {
  try {
    const keys = Object.keys(localStorage);
    return keys
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .map((key) => key.replace(STORAGE_PREFIX, ""));
  } catch (error) {
    console.error("Failed to get saved chat apps:", error);
    return [];
  }
}

/**
 * Export chat history as JSON
 */
export function exportChatHistory(appType: string): string {
  const messages = loadChatHistory(appType);
  return JSON.stringify(messages, null, 2);
}

/**
 * Import chat history from JSON
 */
export function importChatHistory(appType: string, jsonData: string): boolean {
  try {
    const messages = JSON.parse(jsonData);
    saveChatHistory(appType, messages);
    return true;
  } catch (error) {
    console.error("Failed to import chat history:", error);
    return false;
  }
}
