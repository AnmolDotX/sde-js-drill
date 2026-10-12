# System Revision Playbook for Fullstack JS/TS Developers

A distraction-free, stage-wise technical revision portal and interview preparation engine built specifically for Senior Full-Stack JavaScript/TypeScript Engineers and AI Application Developers.

---

## ⚡ Local Setup & Development

Ensure you have your system's latest installed Node.js active via `nvm`:

```bash
# 1. Use latest Node.js installed in your environment
nvm use node
# or
nvm use default

# 2. Always use pnpm as package manager
pnpm install

# 3. Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Landing Page, or [http://localhost:3000/drill](http://localhost:3000/drill) to access the interactive Practice Dashboard.

To create an optimized production build:
```bash
pnpm build
pnpm start
```

---

## 🔐 Admin Access for Anmol (Personalized Resume Track)

> **Important for Admin Anmol:**  
> The personal **Resume Deep Dive** questions (covering Flipkart PAN verification BFF, live polylines tracking map, network override proxy, and Probo L1–L3 approval engine) and the **Resume PDF Companion** drawer are strictly isolated behind an admin flag so general users only see the universal curriculum.

To access your personal Flipkart, Probo, and Zarasana questions:
```
http://localhost:3000/drill?forResumeOfAnmol=true
```

Once opened with `forResumeOfAnmol=true`:
- Anmol's **Phase 3: Resume Deep Dive** track becomes active with all 8 personalized scenario questions.
- The **Resume PDF Companion** button appears in the top navigation bar to render `/assets/AnmolSDE1_3October.pdf` in a slide-out split drawer.
- The state is remembered across local sessions. You can switch back to Public Mode anytime via the header banner button or by visiting `?forResumeOfAnmol=false`.

---

## 📚 Curriculum Structure & Tracks

The curriculum is structured into specialized, modular revision tracks:

1. **Phase 1: Frontend, React & JS Fundamentals**  
   JavaScript runtime, V8 call stacks, microtasks/macrotasks, React Fiber & reconciliation internals, custom hooks, memory leaks, performance on low-end devices, and machine coding patterns.

2. **Phase 2: Backend, Node.js & System Design**  
   Node.js `libuv` event loop phases, thread pool offloading, streams & backpressure, REST API idempotency, JWT rotation with Redis blacklisting, MongoDB compound index ESR rules, webhooks, and distributed system trade-offs.

3. **Phase 3: Personalized Resume Drill (Public: Coming Soon / Admin: Anmol's Projects)**  
   - **Public Mode:** AI Resume Grilling Engine Roadmap *(see below)*.  
   - **Admin Mode (`?forResumeOfAnmol=true`):** In-depth technical stories from Flipkart, Probo, and Zarasana.

4. **Phase 4: CS Core: DBMS, OS, Networking & Diagrams**  
   ACID isolation anomalies (Dirty, Non-repeatable, Phantom, Write skew), PostgreSQL B-Trees vs Hash indexes, Linux process scheduling & virtual memory, HTTP/1.1 vs HTTP/2 vs HTTP/3 QUIC, TLS 1.3 handshakes, SOLID principles, and 10 interactive Mermaid ER models and UML sequence diagrams.

5. **Phase 5: AI Engineering: Agents, RAG & LangGraph**  
   Autonomous ReAct tool loops, Hybrid RAG (Dense vector + BM25 sparse + Cross-Encoder re-ranking), stateful LangGraph multi-agent graphs with cyclic state machines and checkpointing, prompt caching, and cost-latency-accuracy trade-offs.

---

## 🤖 Future Roadmap & TODO: AI-Powered Resume Grilling Engine

> **`TODO: Implement AI Resume Grilling Engine (LangGraph + LangChain)`**

For future releases, Phase 3 will feature an automated pipeline for all candidates:
- **Resume Ingestion & Entity Stripping:** Upload any candidate resume (PDF/DOCX); extract technical stack, database scale, throughput claims, and architecture responsibilities without storing private PII.
- **LangGraph Multi-Agent Orchestration:** A stateful multi-agent system (Inquisitor Agent, Architecture Critique Agent, Evaluator Agent) will analyze candidate projects and identify potential failure points.
- **Targeted Scenario Grilling:** Generates realistic, challenging interview dilemmas specifically tailored to the candidate's claimed past projects (e.g. database failovers, cache coherence, queue deadlocks) rather than generic textbook questions.
- **Market Calibration:** Grilling intensity calibrated against senior engineering hiring bars for Tier-1 startups and tech companies.

---

## 🎨 Design & UI Philosophy

- **Snappy Dual-Pane Workspace:** Left Track Stepper Index stays sticky at the top, while questions scroll independently in a dedicated subpart. The inner stepper list also scrolls smoothly if tall.
- **Natural Page Chaining:** Once through the questions, the page scrolls smoothly into curated modern resources from GreatFrontend, Patterns.dev, ByteByteGo, and official LangGraph guides.
- **Borderless Aesthetic:** Pure typography, subtle background tints, and soft shadows—no harsh borders or distracting outlines.
- **High Contrast Dark & Light Themes:** Instant toggle with zero hydration flash and accessible text contrast.
- **Syntax Highlighting & Architecture Diagrams:** Synchronous Prism tokenization and interactive Mermaid.js SVG rendering.
- **Local Storage Persistence:** Progress and personal revision notes stay strictly in your browser.
