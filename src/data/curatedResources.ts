import { PhaseId } from './types';

export interface ResourceLink {
  title: string;
  source: string;
  url: string;
  description: string;
  badge: string;
  tags: string[];
}

export const CURATED_PHASE_RESOURCES: Record<PhaseId, ResourceLink[]> = {
  'phase-1-frontend': [
    {
      title: 'GreatFrontend Practice & Machine Coding',
      source: 'GreatFrontend',
      url: 'https://www.greatfrontend.com/questions',
      description:
        'The gold standard for modern frontend technical interviews. Master live machine coding (autocomplete, pagination, infinite scroll) and core JavaScript DSA without outdated patterns.',
      badge: 'Recommended Practice',
      tags: ['Machine Coding', 'JavaScript DSA', 'React Components'],
    },
    {
      title: 'Patterns.dev: Modern Web & React Architectures',
      source: 'Patterns.dev',
      url: 'https://www.patterns.dev',
      description:
        'Comprehensive visual deep dives by Addy Osmani & Lydia Hallie on React design patterns, component composition, server components, and client performance optimizations.',
      badge: 'Architecture',
      tags: ['Design Patterns', 'Performance', 'Rendering'],
    },
    {
      title: 'Web.dev: In-Depth Core Web Vitals (INP, LCP, CLS)',
      source: 'web.dev',
      url: 'https://web.dev/explore/fast',
      description:
        'Official Google Chrome performance engineering guides. Learn how to diagnose layout thrashing, eliminate long tasks, and optimize INP on real-world mobile devices.',
      badge: 'Performance Spec',
      tags: ['Core Web Vitals', 'INP', 'Profiler'],
    },
    {
      title: 'Overreacted: React Internals & Mental Models',
      source: 'Dan Abramov',
      url: 'https://overreacted.io',
      description:
        'Foundational articles by React co-creator Dan Abramov explaining useEffect lifecycle, why React re-renders, and the mental model of Fiber reconciliation.',
      badge: 'Core Concepts',
      tags: ['React Internals', 'useEffect', 'Fiber'],
    },
  ],

  'phase-2-backend': [
    {
      title: 'The System Design Primer',
      source: 'Donne Martin (GitHub)',
      url: 'https://github.com/donnemartin/system-design-primer',
      description:
        'The definitive open-source guide to large-scale distributed systems. Covers caching, message queues, asynchronous workers, database replication, and CAP theorem trade-offs.',
      badge: 'System Design Essential',
      tags: ['Distributed Systems', 'Scalability', 'Reliability'],
    },
    {
      title: 'ByteByteGo System Design Newsletter & Diagrams',
      source: 'ByteByteGo (Alex Xu)',
      url: 'https://bytebytego.com',
      description:
        'Crisp, high-fidelity visual architectural breakdowns of rate limiters, payment idempotency, webhook delivery pipelines, and order management backends.',
      badge: 'Visual Architecture',
      tags: ['Idempotency', 'Rate Limiting', 'Webhooks'],
    },
    {
      title: 'Node.js Official Diagnostics & Event Loop Guides',
      source: 'Node.js Foundation',
      url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick',
      description:
        'Authoritative documentation on the libuv event loop phases, process.nextTick priority, stream backpressure handling, and memory heap leak profiling.',
      badge: 'Official Spec',
      tags: ['Node.js Internals', 'libuv', 'Backpressure'],
    },
    {
      title: 'MongoDB University & Manual on Data Modeling',
      source: 'MongoDB Official',
      url: 'https://www.mongodb.com/docs/manual/core/data-modeling-introduction/',
      description:
        'Professional patterns for embedding vs referencing, atomic operators, compound index ESR rule, and optimizing aggregation pipelines at scale.',
      badge: 'Database Mastery',
      tags: ['MongoDB', 'ESR Rule', 'Aggregation'],
    },
  ],

  'phase-3-resume': [
    {
      title: 'Tech Behind Flipkart: Engineering at E-Commerce Scale',
      source: 'Flipkart Tech Blog',
      url: 'https://blog.flipkart.tech',
      description:
        'Read how Flipkart engineers handle massive flash sales, BFF rendering architectures, logistics order routing, and low-bandwidth mobile web performance.',
      badge: 'Company Context',
      tags: ['Flipkart BFF', 'Order Tracking', 'Scale'],
    },
    {
      title: 'Use The Index, Luke! A Guide to Database Performance',
      source: 'Markus Winand',
      url: 'https://use-the-index-luke.com',
      description:
        'The ultimate practical guide for PostgreSQL indexing. Explains execution plans (EXPLAIN ANALYZE), composite index column ordering, and why indexes slow down writes.',
      badge: 'SQL & Indexing',
      tags: ['PostgreSQL', 'EXPLAIN ANALYZE', 'Composite Index'],
    },
    {
      title: 'Martin Fowler: Backend For Frontend (BFF) Pattern',
      source: 'martinfowler.com',
      url: 'https://martinfowler.com/articles/bliki/BackendForFrontend.html',
      description:
        'The foundational architecture article detailing why separating mobile and web BFF layers prevents monolithic API bloat and allows backend-driven rendering.',
      badge: 'Architecture Anchor',
      tags: ['BFF', 'Microservices', 'API Design'],
    },
  ],

  'phase-4-core-cs': [
    {
      title: 'Designing Data-Intensive Applications (DDIA Notes)',
      source: 'Martin Kleppmann',
      url: 'https://dataintensive.net',
      description:
        'The holy grail of distributed databases, transactions, ACID vs BASE, write-ahead logging, B-Trees vs LSM Trees, and consensus algorithms.',
      badge: 'Definitive Reference',
      tags: ['ACID', 'Transactions', 'Distributed Consensus'],
    },
    {
      title: 'High Performance Browser Networking',
      source: 'Ilya Grigorik (O’Reilly)',
      url: 'https://hpbn.co',
      description:
        'Comprehensive open book covering TCP 3-way handshakes, TLS 1.3 performance, HTTP/2 multiplexing, HTTP/3 QUIC, and mobile cellular latency optimizations.',
      badge: 'Networking Deep Dive',
      tags: ['TCP/IP', 'TLS 1.3', 'HTTP/2', 'WebSockets'],
    },
    {
      title: 'Julia Evans Zines: Linux Sockets, Processes & DNS',
      source: 'Julia Evans (jvns.ca)',
      url: 'https://jvns.ca',
      description:
        'Wonderfully clear, visual engineering explanations of Linux file descriptors, how DNS queries resolve, signal handling (SIGTERM vs SIGKILL), and epoll.',
      badge: 'OS & Linux Internals',
      tags: ['Linux', 'File Descriptors', 'DNS', 'Signals'],
    },
    {
      title: 'Refactoring.Guru: SOLID Principles & UML Diagrams',
      source: 'Refactoring.Guru',
      url: 'https://refactoring.guru/design-patterns',
      description:
        'Crystal clear explanations of SOLID design principles, Strategy, Adapter, Factory, and Observer patterns, complete with clean UML class diagrams.',
      badge: 'LLD & Patterns',
      tags: ['SOLID', 'UML', 'Design Patterns'],
    },
  ],

  'phase-5-ai-eng': [
    {
      title: 'LangGraph Official Documentation & Multi-Agent Tutorials',
      source: 'LangChain / LangGraph',
      url: 'https://langchain-ai.github.io/langgraph/',
      description:
        'Learn how to model cyclic stateful multi-agent systems, human-in-the-loop approvals, conditional branch edges, and time-travel memory persistence.',
      badge: 'Agent Architecture',
      tags: ['LangGraph', 'Multi-Agent', 'State Machines'],
    },
    {
      title: 'Anthropic Prompt Engineering & Prompt Caching Guide',
      source: 'Anthropic Docs',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching',
      description:
        'Master real-world prompt caching to reduce token costs and latency by up to 90%, alongside rigorous tool calling patterns and structured schema validation.',
      badge: 'Production LLMs',
      tags: ['Prompt Caching', 'Tool Calling', 'Latency'],
    },
    {
      title: 'Pinecone Learning Center: Hybrid Search & Vector RAG',
      source: 'Pinecone',
      url: 'https://www.pinecone.io/learn/',
      description:
        'Deep dives on Approximate Nearest Neighbor (ANN) search algorithms (HNSW), Hybrid Search combining BM25 keyword matching with dense vectors, and Cross-Encoder reranking.',
      badge: 'RAG & Vector DBs',
      tags: ['Vector Search', 'Hybrid RAG', 'BM25'],
    },
    {
      title: 'DeepLearning.AI: Building Agentic Workflows (Andrew Ng)',
      source: 'DeepLearning.AI',
      url: 'https://www.deeplearning.ai/short-courses/',
      description:
        'Cutting-edge courses covering the four core agentic design patterns: Reflection, Tool Use, Planning, and Multi-Agent Collaboration.',
      badge: 'Agentic AI',
      tags: ['ReAct', 'Agentic Patterns', 'Andrew Ng'],
    },
  ],
};
