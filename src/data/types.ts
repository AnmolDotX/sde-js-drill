export type PhaseId =
  | 'phase-1-frontend'
  | 'phase-2-backend'
  | 'phase-3-resume'
  | 'phase-4-core-cs'
  | 'phase-5-ai-eng';

export type Priority = 'P0' | 'P1' | 'P2';

export interface PracticalExample {
  title?: string;
  code: string;
  language: string;
  explanation?: string;
}

export interface ExternalLink {
  title: string;
  url: string;
  type?: 'docs' | 'article' | 'spec' | 'repo';
}

export interface TopicItem {
  id: string;
  title: string;
  subtitle?: string;
  phase: PhaseId;
  category: string;
  priority: Priority;
  estimatedMins?: number;
  theGist: string;
  howItWorks: string;
  practicalExample?: PracticalExample;
  interviewAnswer: string;
  resumeConnection?: string;
  tradeoffsAndGotchas?: string[];
  followUpQuestions?: string[];
  externalLinks?: ExternalLink[];
  diagramType?: 'er' | 'sequence' | 'class' | 'flow' | 'architecture';
  diagramCode?: string;
}

export interface PhaseMetadata {
  id: PhaseId;
  number: number;
  title: string;
  subtitle?: string;
  shortTitle: string;
  description: string;
  badge: string;
  color: string;
}
