'use client';

import React from 'react';
import Link from 'next/link';
import { ALL_PHASES, ALL_TOPICS } from '../data';
import { useRevisionProgress } from '../hooks/useRevisionProgress';
import { Navbar } from '../components/Navbar';
import { ResumeCompanion } from '../components/ResumeCompanion';

export default function LandingPage() {
  const { completedCount, isCompleted } = useRevisionProgress();
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);

  const percent = ALL_TOPICS.length > 0 ? Math.round((completedCount / ALL_TOPICS.length) * 100) : 0;
  const p0Count = ALL_TOPICS.filter((t) => t.priority === 'P0').length;
  const p0Done = ALL_TOPICS.filter((t) => t.priority === 'P0' && isCompleted(t.id)).length;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar
        completedCount={completedCount}
        totalCount={ALL_TOPICS.length}
        onResumeClick={() => setIsResumeOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-20">
        {/* Hero Header */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-shell)] text-xs font-mono text-[var(--accent)] font-normal shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>FULL-STACK SDE &amp; AI APPLICATION ENGINEER REVISION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text-main)] leading-[1.15]">
            The Systematic Technical Revision Engine.
          </h1>

          <p className="text-base sm:text-lg font-light text-[var(--text-muted)] max-w-2xl leading-relaxed">
            A distraction-free, stage-wise syllabus designed to rapidly refresh high-level concepts, runtime internals, real-world trade-offs, and your personalized Flipkart &amp; Probo resume stories before interviews.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/drill"
              className="px-6 py-3 rounded-xl bg-[var(--accent)] hover:opacity-95 text-neutral-950 text-sm font-medium transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>Launch Practice Dashboard</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="px-5 py-3 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-inner)] border border-[var(--border-shell)] text-sm font-normal text-[var(--text-main)] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>View Resume Anchors PDF</span>
              <span className="text-xs text-[var(--accent)] font-mono">↗</span>
            </button>
          </div>

          {/* Current Local Progress Card */}
          <div className="pt-6 flex items-center gap-6 text-xs font-mono text-[var(--text-dim)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{completedCount} of {ALL_TOPICS.length} Topics Completed ({percent}%)</span>
            </div>
            <div>•</div>
            <div>{p0Done} of {p0Count} P0 Must-Know Mastered</div>
          </div>
        </div>

        {/* 5 Core Curriculum Tracks */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-shell)] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
                Structured Tracks
              </span>
              <h2 className="text-2xl font-normal text-[var(--text-main)] tracking-tight mt-1">
                Five Specialized Preparation Domains
              </h2>
            </div>
            <Link
              href="/drill"
              className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              <span>Explore all {ALL_TOPICS.length} topics in Dashboard</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_PHASES.map((phase) => {
              const phaseTopics = ALL_TOPICS.filter((t) => t.phase === phase.id);
              const phaseCompleted = phaseTopics.filter((t) => isCompleted(t.id)).length;
              const phasePercent = phaseTopics.length > 0 ? Math.round((phaseCompleted / phaseTopics.length) * 100) : 0;

              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-[var(--border-shell)] bg-[var(--bg-card)] p-6 space-y-4 hover:border-[var(--accent)]/40 transition-all flex flex-col justify-between shadow-xs group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--bg-card-inner)] text-[var(--accent)] border border-[var(--border-inner)]">
                        {phase.badge}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-dim)]">
                        {phaseTopics.length} topics
                      </span>
                    </div>

                    <h3 className="text-lg font-medium text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {phase.title}
                    </h3>

                    <p className="text-xs font-light text-[var(--text-muted)] leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  {/* Footer & Jump Link */}
                  <div className="pt-4 border-t border-[var(--border-inner)] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[var(--text-dim)]">
                      {phaseCompleted}/{phaseTopics.length} done ({phasePercent}%)
                    </span>
                    <Link
                      href={`/drill`}
                      className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1 font-normal"
                    >
                      <span>Drill Track</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8-Part Revision Methodology */}
        <section className="rounded-3xl border border-[var(--border-shell)] bg-[var(--bg-card)] p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
              Revision Architecture
            </span>
            <h2 className="text-2xl font-normal text-[var(--text-main)] tracking-tight">
              Built for Depth, Not Rote Memorization
            </h2>
            <p className="text-xs font-light text-[var(--text-muted)] leading-relaxed">
              Every question is dissected using a proven engineering framework so you can confidently answer and defend architectural choices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'The Gist', desc: 'Understand the concept in plain English before terminology.' },
              { num: '02', title: 'How It Works', desc: 'Internal mental models, call stacks, Fiber nodes, and event loops.' },
              { num: '03', title: 'Practical Code', desc: 'Real TypeScript, Node.js, SQL, and algorithm implementations with syntax highlighting.' },
              { num: '04', title: '30–90s Pitch', desc: 'A natural, interview-ready script you can deliver with confidence.' },
              { num: '05', title: 'Resume Anchor', desc: 'Personalized links to your Flipkart, Probo, and Zarasana ownership.' },
              { num: '06', title: 'Trade-offs & Gotchas', desc: 'Avoid common misconceptions and know what NOT to do in production.' },
              { num: '07', title: 'Visual Blueprints', desc: 'Interactive Mermaid diagrams for ER models and UML sequence flows.' },
              { num: '08', title: 'Curated Readings', desc: 'Direct links to GreatFrontend, ByteByteGo, DDIA, and LangGraph.' },
            ].map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-[var(--bg-card-inner)] border border-[var(--border-inner)] space-y-2"
              >
                <div className="text-xs font-mono text-[var(--accent)] font-medium">{step.num}</div>
                <h4 className="text-sm font-medium text-[var(--text-main)]">{step.title}</h4>
                <p className="text-xs font-light text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-shell)] bg-[var(--bg-card)] py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-dim)] font-light">
          <div>
            <span>SDE Revision Drill · Full-Stack &amp; AI Application Engineer</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/drill" className="text-[var(--accent)] hover:underline">
              Enter Practice Dashboard →
            </Link>
          </div>
        </div>
      </footer>

      {/* Resume Companion Drawer */}
      <ResumeCompanion
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
