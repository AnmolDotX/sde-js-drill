import { TopicItem } from '../types';

export const phase3Topics: TopicItem[] = [
  // ==========================================
  // FLIPKART STORIES & ARCHITECTURE
  // ==========================================
  {
    id: 'res-flipkart-pan-bff',
    title: 'Flipkart: PAN Verification & Backend-Driven UI (BFF)',
    subtitle: 'Legacy class codebase, cross-platform bottom sheet (m-site, RN, web), schema fallback',
    phase: 'phase-3-resume',
    category: 'Flipkart Deep Dive',
    priority: 'P0',
    estimatedMins: 15,
    theGist:
      'Engineered a reusable, responsive PAN verification bottom sheet driven by a Backend-for-Frontend (BFF) engine. The backend serves JSON defining form fields, validations, and layouts, which client-side registries render dynamically across m-site, React Native, and desktop web.',
    howItWorks:
      '1. BFF Architecture: Rather than hardcoding form inputs, the client fetches a UI schema from the BFF containing a widget tree (e.g. { type: "INPUT_TEXT", name: "panNumber", regex: "[A-Z]{5}[0-9]{4}[A-Z]{1}", label: "Permanent Account Number" }). 2. Component Registry: A client-side registry maps type strings to concrete platform components. 3. Cross-Platform Abstraction: Business logic (validation, state, submission) is decoupled into shared hooks/controllers, while presentation renders platform-specific primitives (DOM elements on web vs View/TextInput on React Native). 4. Fallback: If the backend emits an unknown widget type, the renderer logs telemetry and renders a safe fallback or skips it, preventing crashes.',
    practicalExample: {
      title: 'Backend-Driven UI Schema & Registry Contract',
      language: 'typescript',
      code: `// BFF Contract
interface WidgetSchema {
  id: string;
  type: 'PAN_INPUT' | 'DATE_PICKER' | 'CONSENT_CHECKBOX' | 'CTA_BUTTON';
  props: Record<string, any>;
  validation?: { regex?: string; required?: boolean; errorMessage?: string };
}

// Component Registry
const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  PAN_INPUT: PanInputField,
  DATE_PICKER: DatePickerField,
  CONSENT_CHECKBOX: ConsentCheckbox,
  CTA_BUTTON: SubmitButton,
};

function DynamicWidgetRenderer({ schema, formData, onChange }: { schema: WidgetSchema; formData: any; onChange: any }) {
  const Component = COMPONENT_REGISTRY[schema.type];
  if (!Component) {
    console.warn(\`Unknown widget type: \${schema.type}. Rendering safe fallback.\`);
    return null; // Graceful degradation
  }
  return <Component {...schema.props} value={formData[schema.id]} onChange={(val: any) => onChange(schema.id, val)} />;
}`,
    },
    interviewAnswer:
      'At Flipkart, compliance mandates required PAN verification for high-value orders exceeding ₹2 lakh. I built a reusable bottom sheet powered by a Backend-Driven UI (BDUI) model. The BFF server controls the form layout, dynamic fields, and server-side validation rules in JSON, allowing product teams to modify compliance copy and validation flows instantly without releasing new app binaries. I maintained cross-platform compatibility across m-site, React Native, and desktop web by isolating business validation logic from platform UI primitives, while implementing defensive registry fallbacks to protect against unknown schema versions.',
    resumeConnection:
      'Directly answers: "PAN verification bottom sheet and backend-driven UI in legacy class-component React codebase across m-site, React Native, and web".',
    tradeoffsAndGotchas: [
      'Trade-off: BDUI increases initial contract payload and requires robust client-side validation fallback so network latency does not delay user feedback.',
      'Legacy class components: Utilized shouldComponentUpdate or PureComponent to avoid unnecessary renders when parent screens updated.',
      'Never claim unsupported revenue numbers: Focus on order unblocking and compliance reliability for ₹2L+ transactions.',
    ],
    followUpQuestions: [
      'Why did you use class components instead of hooks? (Answer: Conforming to existing high-scale production Flipkart codebase conventions and avoiding risky mixed-lifecycle refactors in legacy repos).',
      'How did you handle backward compatibility when adding new fields to the BFF contract?',
    ],
  },
  {
    id: 'res-flipkart-live-tracking-map',
    title: 'Flipkart: Live Order-Tracking Map & Polylines',
    subtitle: 'Encoded polylines, coordinate stream updates, out-of-order rejection, battery optimization',
    phase: 'phase-3-resume',
    category: 'Flipkart Deep Dive',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Implemented real-time client-side route drawing and delivery partner tracking using encoded polylines, distance sampling, and sequenced update handling on mobile web and React Native.',
    howItWorks:
      '1. Encoded Polyline: Lossy coordinate compression algorithm that encodes lat/lng coordinate arrays into compact ASCII strings, reducing payload sizes by ~90%. 2. Route Rendering: Decoded client-side once per route change into a GeoJSON coordinate path for the Map SDK. 3. Out-of-order Updates: GPS updates over cellular networks often arrive out of sequence. Each coordinate packet includes a monotonic sequence number / server timestamp; packets older than the last rendered sequence are discarded. 4. Battery & Performance: Polling is lifecycle-aware (paused when app is backgrounded or tab is inactive); coordinate sampling discards jittery movements under 10 meters; map component is isolated in a separate render boundary.',
    practicalExample: {
      title: 'Sequenced Coordinate Ingestion & Decode Memoization',
      language: 'typescript',
      code: `class LiveTrackingEngine {
  private lastSequenceId = -1;
  private cachedRouteCoords: [number, number][] = [];

  // Decode polyline only when raw route string changes
  updateRoute(encodedPolyline: string) {
    this.cachedRouteCoords = decodePolyline(encodedPolyline);
    mapSdk.drawRoute(this.cachedRouteCoords);
  }

  // Handle incoming rider GPS coordinate push/poll
  handleRiderLocation(update: { lat: number; lng: number; seq: number; timestamp: number }) {
    // Drop out-of-order packets:
    if (update.seq <= this.lastSequenceId) {
      console.warn('Discarded stale out-of-order coordinate packet');
      return;
    }

    this.lastSequenceId = update.seq;
    // Animate marker smoothly rather than re-rendering entire map:
    mapSdk.animateMarkerTo({ lat: update.lat, lng: update.lng });
  }
}`,
    },
    interviewAnswer:
      'In Flipkart’s live order tracking, I handled client-side route rendering from origin, destination, and rider coordinates. We transferred routes using encoded polylines to minimize cellular bandwidth on 2G/3G networks, decoding them once into coordinate arrays. To prevent erratic map jumping caused by network packet reordering, we enforced monotonic sequence checks that reject stale updates. For low-end mobile devices, we isolated the map in a memoized component boundary, paused polling when the browser tab lost visibility, and updated markers via direct SDK animation methods instead of triggering React state re-renders.',
    resumeConnection:
      'Directly answers: "Client-side route drawing from rider, origin and destination coordinates using encoded polylines".',
    tradeoffsAndGotchas: [
      'Do NOT decode the polyline inside the component render loop — polyline decoding is computationally intensive and should be memoized or computed off the main thread.',
      'Distinguish React re-renders from Map SDK native canvas re-renders: re-rendering the parent React component does not need to force the map SDK to reload its tile cache.',
    ],
    followUpQuestions: [
      'What is an encoded polyline and how does its variable-length integer encoding achieve high compression?',
      'How would you simulate and test live tracking trajectories without a physical rider in development?',
    ],
  },
  {
    id: 'res-flipkart-network-mock-proxy',
    title: 'Flipkart: Network Inspection & Response-Override Tool',
    subtitle: 'MITM proxy architecture, TLS interception, cert pinning, mock route matcher',
    phase: 'phase-3-resume',
    category: 'Flipkart Deep Dive',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Engineered a developer tool (inspired by Proxyman/Charles) utilizing a local MITM proxy to capture React Native and mobile web HTTP/HTTPS traffic, intercept requests, and substitute mock API responses.',
    howItWorks:
      '1. MITM Proxy: The mobile device points HTTP proxy settings to the tool’s local port. To inspect HTTPS traffic, the developer installs a local root CA certificate on the device. When the app makes an HTTPS call, the proxy establishes a TLS connection with the target server, generates a certificate on-the-fly signed by the local CA, and establishes a secure TLS connection with the app. 2. Request Matching: Rules evaluate incoming requests based on HTTP Method, URL regex, and optional header/body patterns. 3. Response Override: If matched, the proxy bypasses the upstream server and serves a local JSON mock fixture with custom status code and latency delay simulation. 4. Redaction: Sensitive headers (Authorization, Set-Cookie) and PAN/PII data are redacted before display in the inspection dashboard.',
    practicalExample: {
      title: 'Mock Rule Evaluation Engine',
      language: 'typescript',
      code: `interface MockRule {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  urlPattern: RegExp;
  mockResponse: { statusCode: number; headers: Record<string, string>; body: any };
  delayMs?: number;
}

function matchAndOverride(req: ProxyRequest, rules: MockRule[]): MockResponse | null {
  for (const rule of rules) {
    if (rule.method === req.method && rule.urlPattern.test(req.url)) {
      console.log(\`[MOCK HIT] Overriding \${req.method} \${req.url}\`);
      return rule.mockResponse;
    }
  }
  return null; // Forward to real upstream backend
}`,
    },
    interviewAnswer:
      'To accelerate mobile development and test edge cases (such as edge timeouts, 500 errors, or boundary PAN statuses) without backend dependencies, I built a network inspection and response-override tool. It operates as a local Man-In-The-Middle proxy: the mobile client routes traffic through the proxy using a trusted local CA certificate. Incoming requests are matched against configured routing rules; matched endpoints return mock response fixtures with customizable latency. This dramatically shortened frontend validation loops for complex edge cases.',
    resumeConnection:
      'Directly answers: "Proxyman-style tool using a MITM proxy to capture Android/iOS traffic, override responses and serve mock endpoints".',
    tradeoffsAndGotchas: [
      'Certificate Pinning: If an app has SSL certificate pinning compiled into production builds, MITM interception will fail because the app verifies the server certificate against a hardcoded public key. This tool is intended for debug and staging builds where pinning is disabled.',
      'Security: The tool must strip sensitive auth tokens and PII before logging to shared inspector boards.',
    ],
    followUpQuestions: [
      'How does an HTTP CONNECT tunnel establish a TLS connection through a proxy?',
      'How did you differentiate between requests when multiple endpoints shared identical paths but varied query parameters or headers?',
    ],
  },
  {
    id: 'res-flipkart-deep-links-nav',
    title: 'Flipkart: Deep Links & Cross-Platform Navigation',
    subtitle: 'Universal Links, URL schemes, browser history vs native stack, back button behavior',
    phase: 'phase-3-resume',
    category: 'Flipkart Deep Dive',
    priority: 'P1',
    estimatedMins: 12,
    theGist:
      'Architected reliable deep link routing and bidirectional navigation between mobile web (m-site) and React Native native shells, handling cold/warm app boots and history restoration.',
    howItWorks:
      '1. Protocol Handling: Universal Links (iOS) and App Links (Android) claim web domains (flipkart.com/dl/...), falling back to custom schemes (flipkart://). 2. Route Parsing: Incoming URLs are parsed into route tokens and parameters. 3. Navigation Stack vs History: Browser uses a linear history stack; React Native (React Navigation) uses a hierarchical tree of stack/tab navigators. 4. Back Handling: When a user enters deep into the app from a push notification, the back button must not exit the app immediately; instead, it synthesizes a parent stack hierarchy (e.g., Product Page -> Category -> Home).',
    practicalExample: {
      title: 'Deep Link Route Parser & Synthesized Back Stack',
      language: 'typescript',
      code: `function handleDeepLink(url: string, navigation: any) {
  const parsed = new URL(url);
  // Example: flipkart://order/VS-9012/tracking
  const pathSegments = parsed.pathname.split('/').filter(Boolean);

  if (pathSegments[0] === 'order' && pathSegments[2] === 'tracking') {
    const orderId = pathSegments[1];
    // Reset navigation stack to synthesize natural hierarchy on cold start:
    navigation.reset({
      index: 1,
      routes: [
        { name: 'OrderDetails', params: { orderId } },
        { name: 'LiveTracking', params: { orderId } }
      ]
    });
  }
}`,
    },
    interviewAnswer:
      'Deep linking between m-site and React Native involves bridging two distinct navigation models: the browser linear session history and the native hierarchical screen stack. We used Universal Links with fallback custom URL schemes, routing parsed URLs through a centralized deep-link router. On cold app starts, our router synthesizes the missing ancestor screens so pressing the Android back button returns the user gracefully to the category or home view rather than terminating the app.',
    tradeoffsAndGotchas: [
      'Session loss: Ensure auth tokens and session state are hydrated before rendering the deep-linked screen, redirecting to login with a returnUrl if unauthenticated.',
      'Avoid circular navigation loops where deep-linked back buttons bounce between auth and landing screens.',
    ],
    followUpQuestions: [
      'How would you debug a bug where an Android user opens a deep link, logs in, presses back, and lands on a blank screen?',
    ],
  },

  // ==========================================
  // PROBO STORIES & ARCHITECTURE
  // ==========================================
  {
    id: 'res-probo-approval-engine',
    title: 'Probo: L1–L3 Multi-Level Approval Engine',
    subtitle: 'Relational data model, state machine, concurrent approvals, database transactions',
    phase: 'phase-3-resume',
    category: 'Probo Deep Dive',
    priority: 'P0',
    estimatedMins: 15,
    theGist:
      'Designed and delivered a multi-tier RBAC approval engine for high-stakes vendor agreements, automating manual compliance workflows and enforcing deterministic L1 -> L2 -> L3 sign-offs.',
    howItWorks:
      '1. Data Model: Agreements table links to Approval_Steps and an immutable Audit_Log table. 2. State Machine: Allowed states: DRAFT -> PENDING_L1 -> PENDING_L2 -> PENDING_L3 -> APPROVED (or REJECTED). 3. Concurrency Protection: If two approvers at the same tier act simultaneously, database row-level locking (SELECT FOR UPDATE) or optimistic version checks (version = version + 1) prevent double transitions. 4. Self-Approval Guard: Business rule validation prevents agreement creators from approving their own submissions. 5. Audit Trail: Every status transition inserts an immutable record with approverId, timestamp, previous status, next status, and optional remarks.',
    practicalExample: {
      title: 'Atomic Approval Transition with Optimistic Locking',
      language: 'typescript',
      code: `async function approveAgreement(agreementId: string, approverId: string, expectedLevel: number) {
  return await db.transaction(async (tx) => {
    // 1. Fetch current agreement with lock
    const agreement = await tx.query(
      'SELECT id, status, current_level, creator_id, version FROM agreements WHERE id = $1 FOR UPDATE',
      [agreementId]
    );

    if (!agreement) throw new NotFoundError('Agreement not found');

    // 2. Guard: Prevent self-approval
    if (agreement.creator_id === approverId) {
      throw new ForbiddenError('Self-approval is strictly prohibited');
    }

    // 3. Guard: Validate correct level transition
    if (agreement.current_level !== expectedLevel) {
      throw new ConflictError(\`Invalid stage: expected level \${expectedLevel}, currently at \${agreement.current_level}\`);
    }

    const nextLevel = expectedLevel + 1;
    const nextStatus = nextLevel > 3 ? 'APPROVED' : \`PENDING_L\${nextLevel}\`;

    // 4. Update agreement state atomically
    await tx.query(
      'UPDATE agreements SET status = $1, current_level = $2, version = version + 1, updated_at = NOW() WHERE id = $3',
      [nextStatus, nextLevel, agreementId]
    );

    // 5. Append immutable audit history record
    await tx.query(
      'INSERT INTO approval_audit_logs (agreement_id, approver_id, level, action, timestamp) VALUES ($1, $2, $3, $4, NOW())',
      [agreementId, approverId, expectedLevel, 'APPROVED']
    );

    return { status: nextStatus, level: nextLevel };
  });
}`,
    },
    interviewAnswer:
      'At Probo, I designed a multi-level L1–L3 approval engine for vendor agreements to replace manual compliance bottlenecks. The architecture is driven by a finite state machine: agreements transition sequentially through strictly validated stages. We enforced server-side authorization checks ensuring approvers have the designated level permissions and cannot approve their own submissions. To prevent race conditions from concurrent approvers, all transitions execute within ACID database transactions using row-level locks, writing an append-only audit log for full compliance transparency.',
    resumeConnection:
      'Directly answers: "Designed a multi-level approval engine for vendor agreements, eliminating manual compliance checks".',
    tradeoffsAndGotchas: [
      'What if an approver leaves the organization? Handled via re-assignment workflows where admins can delegate or reassign pending approval tasks while logging the change in audit history.',
      'Rejections: When rejected, the agreement transitions to REJECTED with a mandatory reason, allowing the creator to edit and resubmit back to L1.',
    ],
    followUpQuestions: [
      'How would you represent this approval workflow in MongoDB instead of PostgreSQL, and what changes regarding transactions?',
      'How do you handle delegation when an executive approver goes on leave?',
    ],
  },
  {
    id: 'res-probo-postgres-optimization',
    title: 'Probo: PostgreSQL Query Optimization & Indexing',
    subtitle: 'Slow query logging, EXPLAIN ANALYZE, composite indexes, read/write latency trade-offs',
    phase: 'phase-3-resume',
    category: 'Probo Deep Dive',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Diagnosed and eliminated database latency bottlenecks by analyzing query execution plans with EXPLAIN ANALYZE, structuring composite B-Tree indexes, and eliminating N+1 query patterns.',
    howItWorks:
      '1. Identification: Identified slow queries exceeding latency SLAs using pg_stat_statements and slow query logs. 2. Diagnostics: Ran EXPLAIN (ANALYZE, BUFFERS) to inspect Seq Scan vs Index Scan, buffer read counts, and execution time. 3. Remediation: Replaced sequential scans on filtered/sorted vendor agreement listings with a composite B-Tree index on (status, created_at DESC). 4. Index Order: Put equality filter (status) first and sorting column (created_at) second. 5. N+1 Elimination: Converted loops making individual user lookup queries into bulk JOINs or single WHERE id = ANY(...) queries.',
    practicalExample: {
      title: 'Composite Index & EXPLAIN ANALYZE Verification',
      language: 'sql',
      code: `-- Before Optimization: Seq Scan taking 420ms on 250,000 records
EXPLAIN ANALYZE
SELECT id, title, creator_id, created_at 
FROM agreements 
WHERE status = 'PENDING_L2' 
ORDER BY created_at DESC 
LIMIT 20;

-- Optimization: Create targeted composite B-Tree index
CREATE INDEX idx_agreements_status_created ON agreements (status, created_at DESC);

-- After Optimization: Index Scan using idx_agreements_status_created taking 1.8ms!
-- Execution time reduced by ~99%`,
    },
    interviewAnswer:
      'At Probo, as the agreement and audit logs grew, queries filtering pending approvals sorted by date began triggering sequential table scans. I used PostgreSQL EXPLAIN ANALYZE to identify the bottleneck: the planner was performing full table scans followed by in-memory external sorts. I resolved this by adding a composite B-tree index on (status, created_at DESC). Because the equality filter is positioned first and the sort column second, the database reads rows directly in pre-sorted order, dropping query latency from over 400ms to sub-5ms.',
    resumeConnection:
      'Directly answers: "Optimized database queries using indexing strategies to reduce latency".',
    tradeoffsAndGotchas: [
      'Write Amplification: Every additional index adds overhead to INSERT and UPDATE queries. We pruned unused indexes using pg_stat_user_indexes.',
      'Do not invent unrealistic benchmark figures; speak to the actual execution plan changes (Seq Scan -> Index Scan) and measured relative latency drops.',
    ],
    followUpQuestions: [
      'What is the difference between an Index Scan and an Index Only Scan in PostgreSQL?',
      'How does PostgreSQL autovacuum prevent table bloat and why does index efficiency degrade without it?',
    ],
  },
  {
    id: 'res-probo-postgres-to-mongo',
    title: 'Probo: Translating Relational (PostgreSQL) to Document (MongoDB)',
    subtitle: 'Translating agreements, approvals, and audit history to MongoDB document patterns',
    phase: 'phase-3-resume',
    category: 'Probo Deep Dive',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Vijay Sales emphasizes MongoDB. This topic prepares you to fluently translate your PostgreSQL Probo approval engine experience into MongoDB document modeling without missing a beat.',
    howItWorks:
      'In PostgreSQL, agreements, approval levels, and audit logs live in 3 normalized tables joined via foreign keys. In MongoDB: 1) The main agreement document embeds the current status, level, and an array of approval steps (since approval steps are bounded: max 3–5 items, read together); 2) User accounts remain in a separate users collection referenced by ObjectId; 3) Audit history can be embedded up to a sensible limit or placed in an audit_events collection referenced by agreementId to keep document sizes small; 4) State transitions use conditional atomic findOneAndUpdate instead of SQL transactions.',
    practicalExample: {
      title: 'MongoDB Document Equivalent of Probo Approval',
      language: 'javascript',
      code: `const AgreementDocument = {
  _id: new ObjectId(),
  agreementNumber: "AGR-2024-991",
  creatorId: new ObjectId("..."),
  status: "PENDING_L2",
  currentLevel: 2,
  version: 3,
  // Bounded embedded array:
  steps: [
    { level: 1, approverId: new ObjectId("..."), decision: "APPROVED", decidedAt: new Date("...") },
    { level: 2, approverId: null, decision: "PENDING", decidedAt: null },
    { level: 3, approverId: null, decision: "PENDING", decidedAt: null }
  ],
  createdAt: new Date()
};

// Atomic Transition in MongoDB:
const updated = await db.agreements.findOneAndUpdate(
  { _id: agreementId, currentLevel: 2, status: "PENDING_L2", version: 3 },
  {
    $set: {
      status: "PENDING_L3",
      currentLevel: 3,
      "steps.1.approverId": approverId,
      "steps.1.decision": "APPROVED",
      "steps.1.decidedAt": new Date()
    },
    $inc: { version: 1 }
  },
  { returnDocument: 'after' }
);`,
    },
    interviewAnswer:
      'While I implemented the approval engine in PostgreSQL, mapping it to MongoDB is straightforward: because approval tiers (L1, L2, L3) are strictly bounded to 3 steps and read alongside the agreement on every screen, embedding the steps array directly inside the agreement document provides O(1) single-read performance. We reference the user collection for approver details to avoid data duplication. For atomic state transitions, we utilize conditional findOneAndUpdate matching on the current status and version, guaranteeing safe concurrent updates without needing heavy multi-document transactions.',
    resumeConnection:
      'Crucial bridge between your real Probo PostgreSQL ownership and Vijay Sales’ MongoDB stack.',
    tradeoffsAndGotchas: [
      'Be clear: MongoDB is not automatically "better" than PostgreSQL or vice versa; SQL provides strict referential integrity and relational constraints, whereas MongoDB optimizes for fast, single-document document retrieval.',
    ],
    followUpQuestions: [
      'How would you enforce that an approver cannot approve twice in MongoDB using array operators like $elemMatch?',
    ],
  },

  // ==========================================
  // ZARASANA STORIES & ARCHITECTURE
  // ==========================================
  {
    id: 'res-zarasana-component-lib-cli',
    title: 'Zarasana: UI Component Library, CLI Tooling & Theming',
    subtitle: 'CLI-based component distribution (shadcn model), CSS variable tokens, multi-theme architecture',
    phase: 'phase-3-resume',
    category: 'Zarasana Deep Dive',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Architected a production UI component library featuring a CLI-driven integration tool that copies extensible components directly into consumer codebases, backed by a CSS variable token design system.',
    howItWorks:
      '1. Distribution Model: Rather than publishing a monolithic NPM bundle (which limits customization and bloats bundles), the CLI fetches atomic component source files directly into the user’s components directory (similar to shadcn/ui). 2. Theming Architecture: Driven entirely by semantic CSS variables (--background, --foreground, --accent, --radius). Switching themes (dark, light, high-contrast) updates CSS variables on :root with zero runtime JS style overhead. 3. Accessibility & Types: All components export strict TypeScript props and adhere to WAI-ARIA standards.',
    practicalExample: {
      title: 'Token Design System & CLI Architecture',
      language: 'css',
      code: `/* CSS Custom Property Design System */
:root {
  --bg-primary: #ffffff;
  --text-primary: #171717;
  --accent-color: #e2b714;
}

[data-theme="dark"] {
  --bg-primary: #323437;
  --text-primary: #d1d0c5;
  --accent-color: #e2b714;
}

/* Zero Runtime CSS: Utility classes map directly to tokens */
.card {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}`,
    },
    interviewAnswer:
      'At Zarasana, I architected a UI component library and custom CLI integration tool. Rather than distributing compiled NPM packages which lock consumers into rigid abstractions, the CLI injects raw, fully typed component code directly into consumer repositories. The styling engine relies on semantic CSS custom properties, allowing multiple brand themes to be swapped instantaneously without CSS-in-JS runtime overhead. This provided full developer ownership, zero unnecessary bundle bloat, and unified design token consistency.',
    resumeConnection:
      'Directly answers: "UI component library with CLI-based integration tooling, 10+ components and theming architecture supporting multiple design systems".',
    tradeoffsAndGotchas: [
      'CLI vs NPM: CLI distribution gives developers complete control over component source code, but updating components requires intentional CLI syncs rather than automated package bumps.',
      'Strictly avoid runtime CSS-in-JS (like styled-components) in modern Next.js/React setups due to Server Component serialization overhead.',
    ],
    followUpQuestions: [
      'How did the CLI resolve and install peer dependencies automatically when adding complex components?',
    ],
  },
];
