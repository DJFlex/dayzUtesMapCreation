export interface Step {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoEmbed?: string;
  downloadLinks?: DownloadLink[];
  codeSnippet?: string;
  language?: string;
  completed?: boolean;
  icon?: string;
}

export interface DownloadLink {
  name: string;
  url: string;
  description?: string;
}

export interface Note {
  stepId: string;
  content: string;
  timestamp: number;
}

export type Theme = 'light' | 'dark';
