'use client';

import React from 'react';

// TODO: Implement AI Resume Grilling Engine (LangGraph + LangChain agentic workflow)
// Pipeline specifications:
// 1. Ingest PDF/DOCX resume file
// 2. Unstructured extraction of projects, technologies, claimed metrics & system scale
// 3. Multi-agent LangGraph workflow:
//    - Architecture Assessor Agent: Identifies claimed high-concurrency, database, or queue components
//    - Grilling Inquisitor Agent: Formulates tricky edge-case failure & race-condition scenarios
//    - Evaluator Agent: Grades candidate response against senior engineering bar
// 4. Output: Personalized interview drill cards specific to candidate's background

export function AiResumeComingSoon() {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-[var(--bg-card)] p-6 sm:p-8 shadow-[var(--card-shadow)] space-y-6 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
              Phase 3 · Architectural Roadmap
            </span>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 font-medium">
            COMING SOON · IN ACTIVE DEVELOPMENT
          </span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h3 className="text-2xl sm:text-3xl font-normal text-[var(--text-main)] tracking-tight">
            AI-Powered Personalized Resume Grilling Engine
          </h3>
          <p className="text-sm text-[var(--text-muted)] font-normal leading-relaxed">
            Most interview candidates fail not on generic LeetCode or textbook JS, but when interviewers drill deep into <strong className="text-[var(--text-main)] font-semibold">their own past projects, scale claims, and architecture trade-offs</strong>. We are developing an autonomous multi-agent engine powered by <strong className="text-purple-600 dark:text-purple-400 font-medium">LangChain &amp; LangGraph</strong> to rigorously grill you on your exact experience.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[var(--bg-card-inner)] space-y-2 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono text-xs flex items-center justify-center font-semibold">
              01
            </div>
            <h4 className="text-xs font-semibold text-[var(--text-main)]">
              Semantic Project Extraction
            </h4>
            <p className="text-[11px] text-[var(--text-dim)] font-normal leading-relaxed">
              Upload your resume (PDF/DOCX). The pipeline extracts claimed architectural components, data stores, traffic volume, and queue systems without storing private candidate PII.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-inner)] space-y-2 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono text-xs flex items-center justify-center font-semibold">
              02
            </div>
            <h4 className="text-xs font-semibold text-[var(--text-main)]">
              LangGraph Inquisitor Agent
            </h4>
            <p className="text-[11px] text-[var(--text-dim)] font-normal leading-relaxed">
              A stateful multi-agent system models the interviewer perspective, looking for weak points: database failover scenarios, cache stampedes, or race conditions in your actual past stack.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-inner)] space-y-2 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono text-xs flex items-center justify-center font-semibold">
              03
            </div>
            <h4 className="text-xs font-semibold text-[var(--text-main)]">
              Real Market-Calibrated Grilling
            </h4>
            <p className="text-[11px] text-[var(--text-dim)] font-normal leading-relaxed">
              Generates tricky scenario challenges distinct from the general JS/Node drill tracks — focusing solely on trade-offs you made and defending your engineering decisions.
            </p>
          </div>
        </div>

        {/* Interactive Upload Mockup Dropzone */}
        <div className="border border-dashed border-[var(--border-inner)] rounded-2xl p-8 text-center space-y-3 bg-[var(--bg-card-inner)]/50">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl">
            📄
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--text-main)]">
              Resume Document Ingestion Pipeline
            </p>
            <p className="text-xs text-[var(--text-dim)] font-normal max-w-md mx-auto">
              PDF &amp; DOCX parser integration is under active development. In the meantime, revise core Frontend, Backend, CS Core, and AI Engineering tracks!
            </p>
          </div>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 font-mono text-[11px] font-medium">
              Target Release: Next Iteration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
