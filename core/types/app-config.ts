export interface AppConfig {
  name: string;
  icon: string; // Emoji or path to image
  description: string;
  welcomeMessage: string;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  footer: {
    attribution: string;
    links: Array<{label: string; href: string}>;
  };
}
