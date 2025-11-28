export interface HeaderProps {
  appName: string;
  appIcon?: string;
}

export interface FooterProps {
  attribution?: string;
  links?: Array<{label: string; href: string}>;
}

export interface MessageProps {
  content: string;
  timestamp: Date;
  source?: "kiro-cli" | "fallback";
  error?: boolean;
}

export interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface EmptyStateProps {
  welcomeMessage: string;
  appIcon?: string;
}
