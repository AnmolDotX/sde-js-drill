import { PhaseMetadata, TopicItem } from './types';
import { phase1Topics } from './phases/phase1-frontend';
import { phase2Topics } from './phases/phase2-backend';
import { phase3Topics } from './phases/phase3-resume';
import { phase4Topics } from './phases/phase4-core-cs';
import { phase5Topics } from './phases/phase5-ai-eng';

export * from './types';
export { phase1Topics, phase2Topics, phase3Topics, phase4Topics, phase5Topics };

export const ANMOL_RESUME_PHASE: PhaseMetadata = {
  id: 'phase-3-resume',
  number: 3,
  title: 'Resume Deep Dive (Flipkart, Probo, Zarasana)',
  shortTitle: 'Resume Deep Dive',
  description:
    'Personalized technical stories: Flipkart PAN verification BFF & live tracking map, Probo L1-L3 approval engine & Postgres optimization, Zarasana CLI component library.',
  badge: 'Phase 3 · Admin Personalized',
  color: '#e2b714',
};

export const AI_RESUME_COMING_SOON_PHASE: PhaseMetadata = {
  id: 'phase-3-ai-resume',
  number: 3,
  title: 'Personalized Resume Drill (AI Grilling Engine)',
  shortTitle: 'AI Resume Drill',
  description:
    'Upcoming LangChain & LangGraph multi-agent pipeline that parses your uploaded resume and generates targeted scenario questions anchored to your real projects and scale.',
  badge: 'Phase 3 · Coming Soon',
  color: '#8b5cf6',
};

export const ALL_PHASES: PhaseMetadata[] = [
  {
    id: 'phase-1-frontend',
    number: 1,
    title: 'Frontend, React & JS Fundamentals',
    shortTitle: 'Frontend & JS',
    description:
      'JavaScript runtime, async event loop, React Fiber & reconciliation, hooks, performance on low-end devices, machine coding & frontend DSA.',
    badge: 'Phase 1',
    color: '#e2b714',
  },
  {
    id: 'phase-2-backend',
    number: 2,
    title: 'Backend, Node.js & System Design',
    subtitle: 'Node internals, REST APIs, Auth, MongoDB & Webhooks',
    shortTitle: 'Backend & Node',
    description:
      'Node.js libuv architecture, streams, REST API contracts, JWT rotation, MongoDB indexing, idempotent webhooks & system design.',
    badge: 'Phase 2',
    color: '#d1d0c5',
  },
  AI_RESUME_COMING_SOON_PHASE,
  {
    id: 'phase-4-core-cs',
    number: 4,
    title: 'CS Core: DBMS, OS, Networking & Diagrams',
    shortTitle: 'CS Core & Diagrams',
    description:
      'ACID & isolation levels, Linux processes & memory, HTTP/TLS/CORS, SOLID principles, 10 ER diagrams and UML class/sequence blueprints.',
    badge: 'Phase 4',
    color: '#98c379',
  },
  {
    id: 'phase-5-ai-eng',
    number: 5,
    title: 'AI Engineering: Agents, RAG & LangGraph',
    shortTitle: 'AI Engineering',
    description:
      'Autonomous ReAct loops, Hybrid RAG with cross-encoders, stateful LangGraph multi-agent graphs, prompt caching and production trade-offs.',
    badge: 'Phase 5 · AI Track',
    color: '#61afef',
  },
];

export function getActivePhases(forResumeOfAnmol: boolean = false): PhaseMetadata[] {
  return [
    ALL_PHASES[0], // Phase 1 Frontend
    ALL_PHASES[1], // Phase 2 Backend
    forResumeOfAnmol ? ANMOL_RESUME_PHASE : AI_RESUME_COMING_SOON_PHASE,
    ALL_PHASES[3], // Phase 4 CS Core
    ALL_PHASES[4], // Phase 5 AI Engineering
  ];
}

export const ALL_TOPICS: TopicItem[] = [
  ...phase1Topics,
  ...phase2Topics,
  ...phase3Topics,
  ...phase4Topics,
  ...phase5Topics,
];

export function getActiveTopics(forResumeOfAnmol: boolean = false): TopicItem[] {
  return [
    ...phase1Topics,
    ...phase2Topics,
    ...(forResumeOfAnmol ? phase3Topics : []),
    ...phase4Topics,
    ...phase5Topics,
  ];
}

export function getTopicsByPhase(phaseId: string): TopicItem[] {
  return ALL_TOPICS.filter((t) => t.phase === phaseId);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(ALL_TOPICS.map((t) => t.category)));
}
