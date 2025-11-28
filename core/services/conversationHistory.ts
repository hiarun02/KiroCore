import {Message} from "@/core/types/message";

const CONVERSATIONS_PREFIX = "kirocore_conversations_";
const ACTIVE_CONVERSATION_PREFIX = "kirocore_active_";

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
  appType: string;
}

/**
 * Generate a title from the first user message
 */
function generateTitle(messages: Message[]): string {
  const firstUserMessage = messages.find((m) => m.role === "user");
  if (!firstUserMessage) return "New Conversation";

  const content = firstUserMessage.content;
  // Take first 50 characters
  return content.length > 50 ? content.substring(0, 50) + "..." : content;
}

/**
 * Get all conversations for an app
 */
export function getConversations(appType: string): Conversation[] {
  try {
    const key = `${CONVERSATIONS_PREFIX}${appType}`;
    const saved = localStorage.getItem(key);

    if (!saved) return [];

    const conversations = JSON.parse(saved) as Conversation[];
    // Convert timestamp strings back to Date objects
    return conversations.map((conv) => ({
      ...conv,
      timestamp: new Date(conv.timestamp),
      messages: conv.messages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch (error) {
    console.error("[conversationHistory] Failed to load conversations:", error);
    return [];
  }
}

/**
 * Save all conversations for an app
 */
function saveConversations(
  appType: string,
  conversations: Conversation[]
): void {
  try {
    const key = `${CONVERSATIONS_PREFIX}${appType}`;
    localStorage.setItem(key, JSON.stringify(conversations));
    console.log(
      `[conversationHistory] Saved ${conversations.length} conversations`
    );
  } catch (error) {
    console.error("[conversationHistory] Failed to save conversations:", error);
  }
}

/**
 * Get active conversation ID
 */
export function getActiveConversationId(appType: string): string | null {
  try {
    const key = `${ACTIVE_CONVERSATION_PREFIX}${appType}`;
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

/**
 * Set active conversation ID
 */
export function setActiveConversationId(
  appType: string,
  conversationId: string
): void {
  try {
    const key = `${ACTIVE_CONVERSATION_PREFIX}${appType}`;
    localStorage.setItem(key, conversationId);
  } catch (error) {
    console.error(
      "[conversationHistory] Failed to set active conversation:",
      error
    );
  }
}

/**
 * Create a new conversation
 */
export function createNewConversation(appType: string): string {
  const conversationId = `conv_${Date.now()}`;
  setActiveConversationId(appType, conversationId);
  console.log(
    `[conversationHistory] Created new conversation: ${conversationId}`
  );
  return conversationId;
}

/**
 * Save current conversation
 */
export function saveCurrentConversation(
  appType: string,
  conversationId: string,
  messages: Message[]
): void {
  if (messages.length === 0) return;

  try {
    const conversations = getConversations(appType);
    const existingIndex = conversations.findIndex(
      (c) => c.id === conversationId
    );

    const conversation: Conversation = {
      id: conversationId,
      title: generateTitle(messages),
      messages,
      timestamp: new Date(),
      appType,
    };

    if (existingIndex >= 0) {
      // Update existing conversation
      conversations[existingIndex] = conversation;
    } else {
      // Add new conversation at the beginning
      conversations.unshift(conversation);
    }

    // Keep only last 50 conversations
    const trimmed = conversations.slice(0, 50);
    saveConversations(appType, trimmed);
  } catch (error) {
    console.error(
      "[conversationHistory] Failed to save current conversation:",
      error
    );
  }
}

/**
 * Load a specific conversation
 */
export function loadConversation(
  appType: string,
  conversationId: string
): Message[] {
  try {
    const conversations = getConversations(appType);
    const conversation = conversations.find((c) => c.id === conversationId);
    return conversation ? conversation.messages : [];
  } catch (error) {
    console.error("[conversationHistory] Failed to load conversation:", error);
    return [];
  }
}

/**
 * Delete a conversation
 */
export function deleteConversation(
  appType: string,
  conversationId: string
): void {
  try {
    const conversations = getConversations(appType);
    const filtered = conversations.filter((c) => c.id !== conversationId);
    saveConversations(appType, filtered);

    // If deleted conversation was active, clear active ID
    if (getActiveConversationId(appType) === conversationId) {
      const key = `${ACTIVE_CONVERSATION_PREFIX}${appType}`;
      localStorage.removeItem(key);
    }

    console.log(
      `[conversationHistory] Deleted conversation: ${conversationId}`
    );
  } catch (error) {
    console.error(
      "[conversationHistory] Failed to delete conversation:",
      error
    );
  }
}

/**
 * Clear all conversations for an app
 */
export function clearAllConversations(appType: string): void {
  try {
    const key = `${CONVERSATIONS_PREFIX}${appType}`;
    localStorage.removeItem(key);
    const activeKey = `${ACTIVE_CONVERSATION_PREFIX}${appType}`;
    localStorage.removeItem(activeKey);
    console.log(
      `[conversationHistory] Cleared all conversations for ${appType}`
    );
  } catch (error) {
    console.error(
      "[conversationHistory] Failed to clear conversations:",
      error
    );
  }
}
