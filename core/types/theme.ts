export type Theme = "haunt" | "human";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
