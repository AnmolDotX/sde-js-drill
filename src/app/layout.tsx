import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://sde-js-drill.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SDE Drill — Full-Stack JavaScript, TypeScript & AI Interview Revision Playbook',
    template: '%s | SDE Drill',
  },
  description:
    'Targeted senior-level technical revision portal for Full-Stack JavaScript, TypeScript, Node.js, and AI Application Engineers. Master V8 runtime internals, React 19 Fiber, distributed system design, SQL/NoSQL indexing, and LangGraph multi-agent workflows with 30–90 second interview pitch frameworks.',
  keywords: [
    // High-Intent General Revision
    'fullstack interview revision',
    'full stack javascript interview questions',
    'senior sde interview preparation',
    'sde 2 interview questions',
    'staff engineer interview playbook',
    'technical interview revision engine',
    '30 second interview pitch answers',
    'system revision playbook for fullstack js ts developers',

    // Frontend & JavaScript / TypeScript Internals
    'javascript interview questions and answers',
    'frontend interview preparation guide',
    'v8 execution context and call stack',
    'hoisting and temporal dead zone tdz',
    'closures and stale closure traps react',
    'javascript prototype chain inheritance',
    'javascript event loop microtasks macrotasks',
    'promise combinators all allsettled race any',
    'abortcontroller request cancellation fetch',
    'debounce vs throttle javascript implementation',
    'virtual dom react 19 fiber reconciliation',
    'core web vitals inp lcp cls optimization',
    'frontend system design interview',
    'typescript senior interview questions',

    // Backend, Node.js & Distributed Systems
    'nodejs interview questions senior',
    'libuv architecture thread pool event loop phases',
    'nodejs streams and backpressure handling',
    'api idempotency key redis pattern',
    'keyset cursor pagination vs offset limit',
    'rate limiting algorithms token bucket leaky bucket sliding window',
    'jwt authentication refresh token rotation',
    'role based access control rbac nodejs',
    'mongodb indexing compound multikey explain plan',
    'redis caching patterns cache aside write through distributed lock redlock',
    'system design interview full stack',

    // CS Fundamentals & Networking
    'computer science fundamentals interview',
    'tcp 3 way handshake vs udp vs websockets',
    'acid transactions database isolation levels mvcc',
    'b trees vs lsm trees database indexing',
    'cap theorem pacelc distributed systems',
    'consistent hashing distributed cache',

    // AI Engineering & LLM Application Workflows
    'ai engineer interview questions',
    'ai application engineer interview prep',
    'langgraph multi agent workflows',
    'langchain state graph agent orchestration',
    'retrieval augmented generation rag chunking reranking',
    'semantic caching vector database embeddings',
    'llm streaming time to first token ttft optimization',
  ],
  authors: [{ name: 'Anmol Kumar', url: 'https://github.com/AnmolDotX' }],
  creator: 'Anmol Kumar',
  publisher: 'Zarasana Labs',
  applicationName: 'SDE Drill',
  category: 'education',
  classification: 'Software Engineering Interview Preparation',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'SDE Drill — Full-Stack JavaScript & AI Interview Revision Playbook',
    description:
      'Curated senior technical revision curriculum: V8 runtime internals, React 19 concurrent mode, Node.js libuv, distributed systems, and AI agent architectures with 30-90s pitch answers.',
    url: siteUrl,
    siteName: 'SDE Drill',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SDE Drill — Full-Stack JavaScript & AI Interview Revision Playbook',
    description:
      'Targeted revision guide for senior JS/TS and AI Application Engineers. 58+ P0 topics with mental models, production code blueprints, and 30-90s pitch answers.',
    creator: '@AnmolDotX',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#app`,
      name: 'SDE Drill',
      url: siteUrl,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description:
        'Interactive stage-wise revision dashboard for Full-Stack JavaScript, Node.js, and AI Application Engineering interviews.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '58+ Senior Technical Interview Drills',
        '30-90 Second Conversational Pitch Answers',
        'Interactive Mermaid Architecture Diagrams',
        'Syntax Highlighted Code Blueprints',
        'Local Browser Revision Tracking',
        'Fast Keyboard Search & Stepper Navigation',
      ],
      author: {
        '@type': 'Person',
        name: 'Anmol Kumar',
        url: 'https://github.com/AnmolDotX',
      },
    },
    {
      '@type': 'Course',
      '@id': `${siteUrl}/#course`,
      name: 'Full-Stack JavaScript & AI Application Engineer Interview Curriculum',
      description:
        'Comprehensive senior revision tracks covering JavaScript internals, React 19, Node.js libuv architecture, distributed caching, and LangGraph multi-agent systems.',
      provider: {
        '@type': 'Organization',
        name: 'Zarasana Labs',
        url: siteUrl,
      },
      educationalLevel: 'Advanced / Senior Software Engineer',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'PT10H',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Execution Context and Call Stack in JavaScript?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every time JavaScript code runs, it evaluates inside an Execution Context containing a Variable Environment, Lexical Environment, and "this" binding. The Call Stack manages the LIFO execution order of these contexts, creating Global and Function execution contexts in two distinct phases: Memory Creation and Code Execution.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the Node.js Event Loop and libuv handle asynchronous operations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Node.js delegates asynchronous I/O to libuv, a C library that leverages OS-level non-blocking primitives (epoll, kqueue, IOCP) for network sockets and a multi-threaded worker pool (default 4 threads) for blocking tasks like file system I/O, DNS resolution, and crypto operations.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you implement API idempotency in distributed systems?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'API idempotency is achieved by requiring clients to send a unique Idempotency-Key header. The server acquires a distributed lock in Redis with a TTL. If the key exists, it either waits or returns the cached response; if new, it processes the request and caches the result with an expiration window.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Cursor-based pagination and Offset-based pagination?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Offset pagination executes an O(N) full-table scan that degrades severely as pages increase and produces duplicate or skipped items if rows are inserted concurrently. Cursor (keyset) pagination performs an O(1) indexed seek using a pointer like timestamp or ID (WHERE id > cursor LIMIT N).',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('sde_drill_theme_v1') || 'dark';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(savedTheme);
                document.documentElement.setAttribute('data-theme', savedTheme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased selection:bg-[var(--accent)] selection:text-neutral-950 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
