export interface Step {
  id: string;
  title: string;
  description: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  content?: string;
  videoUrl?: string;
  downloadLinks?: DownloadLink[];
  codeSnippet?: string;
  language?: string;
  completed?: boolean;
}

export interface DownloadLink {
  name: string;
  url: string;
  description: string;
}

export interface Note {
  stepId: string;
  content: string;
  timestamp: number;
}

export interface MapConfig {
  mapName: string;
  modFolderName: string;
  authorName: string;
  description: string;
  customUrl: string;
}
