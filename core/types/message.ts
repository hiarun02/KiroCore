export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  source?: "kiro-cli" | "fallback";
  error?: boolean;
}
